package com.example.springboot.commons.service;

import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.Drug;
import com.example.springboot.commons.domain.Order;
import com.example.springboot.commons.domain.OrderDrugRelate;
import com.example.springboot.commons.domain.User;
import com.example.springboot.commons.mapper.DrugMapper;
import com.example.springboot.commons.mapper.OrderDrugRelateMapper;
import com.example.springboot.commons.mapper.OrderMapper;
import com.example.springboot.commons.util.UUIDUtils;
import com.example.springboot.front.mapper.CartMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.TimeUnit;

/**
 * @author Yuan
 * @description
 * @date 2023/5/9
 */
@Service
public class OrderService {

  @Resource
  private OrderMapper orderMapper;
  @Resource
  private OrderDrugRelateMapper orderDrugRelateMapper;
  @Resource
  private DrugMapper drugMapper;
  @Resource
  private RedisTemplate redisTemplate;

  @Transactional
  public Order createOrder(String[] cartIds, HttpSession session){
    String orderId = UUIDUtils.getUUID();
    Order order = new Order();
    order.setId(orderId);
    User user = (User) session.getAttribute(Constant.SESSION_USER);
    order.setUsername(user.getName());
    order.setUid(user.getUid());
    order.setUserAddress(user.getAddress());
    //根据cartIds查询出所有的药物信息
    List<Drug> drugList = drugMapper.selectDrugByCartIds(cartIds);
    //保存订单信息
    orderMapper.insert(order);
    //保存订单和药物的关系信息
    for (Drug drug : order.getDrug()) {
      OrderDrugRelate orderDrugRelate = new OrderDrugRelate();
      orderDrugRelate.setOrderId(orderId);
      orderDrugRelate.setDrugId(drug.getDid());
      orderDrugRelate.setDrugCount(drug.getCount());
      orderDrugRelateMapper.insert(orderDrugRelate);
    }

    //保存数据到redis中，过期时间设置为15分钟
    redisTemplate.opsForValue().set("order:"+orderId,orderId,15, TimeUnit.MINUTES);
    return order;
  }

  public List<Order> list() {
    return orderMapper.selectAll();
  }
}
