package com.example.springboot.front.service;

import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.payment.page.models.AlipayTradePagePayResponse;
import com.example.springboot.commons.config.AliPayConfig;
import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.*;
import com.example.springboot.commons.mapper.DrugMapper;
import com.example.springboot.commons.mapper.OrderDrugRelateMapper;
import com.example.springboot.commons.mapper.OrderMapper;
import com.example.springboot.front.domain.AliPay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.List;

/**
 * @author Yuan
 * @description
 * @date 2023/5/9
 */
@Service
public class AliPayService {

  @Resource
  private OrderMapper orderMapper;
  @Resource
  private DrugMapper drugMapper;
  @Resource
  private OrderDrugRelateMapper orderDrugRelateMapper;
  @Resource
  private AliPayConfig aliPayConfig;
  @Autowired
  private RedisTemplate redisTemplate;

  @Transactional
  public Object pay(AliPay aliPay, HttpSession session){
    AlipayTradePagePayResponse response;
    try {
      //查看订单是否失效
      Long expire = redisTemplate.getExpire("order:" + aliPay.getTraceNo());
      if(expire != -2){
        //判断订单是否存在
        Order order = orderMapper.selectByPrimaryKey(aliPay.getTraceNo());
        if(order != null){
          // 发起API调用（以创建当面付收款二维码为例）
          response = Factory.Payment.Page()
            .pay(URLEncoder.encode(aliPay.getSubject(), "UTF-8"), aliPay.getTraceNo(), aliPay.getTotalAmount()+"", aliPayConfig.getReturnUrl());
          System.out.println(response.getBody());
          //更新订单状态
          order.setState("1");
          orderMapper.updateByPrimaryKey(order);
          List<OrderDrugRelate> drugList = orderDrugRelateMapper.selectByOrderId(order.getId());
          //修改库存
          for (OrderDrugRelate orderDrugRelate : drugList) {
            Drug drug = drugMapper.selectByPrimaryKey(orderDrugRelate.getDrugId());
            drug.setCount(drug.getCount() - orderDrugRelate.getDrugCount());
            drugMapper.updateByPrimaryKeySelective(drug);
          }
      }else{
          //TODO：订单过期，修改原来的状态
          Order o = new Order();
          o.setId(aliPay.getTraceNo());
          o.setState("-1"); //删除
          orderMapper.updateByPrimaryKey(order);
          return new JsonResult(Constant.FAILURE_CODE,"订单已过期");
        }

      }else{
        return new JsonResult(Constant.FAILURE_CODE,"订单不存在");
      }

    } catch (Exception e) {
      System.err.println("调用遭遇异常，原因：" + e.getMessage());
      throw new RuntimeException(e.getMessage(), e);
    }
    return new JsonResult(Constant.SUCCESS_CODE,response.getBody());
  }
}
