package com.example.springboot.front.controller;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.payment.page.models.AlipayTradePagePayResponse;
import com.example.springboot.commons.config.AliPayConfig;
import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.Drug;
import com.example.springboot.commons.domain.JsonResult;
import com.example.springboot.commons.domain.Order;
import com.example.springboot.commons.service.OrderService;
import com.example.springboot.front.domain.AliPay;
import com.example.springboot.front.service.AliPayService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;


/**
 * @author Yuan
 * @description
 * @date 2023/3/8
 */
@Controller
@RequestMapping("/front")
public class AliPayController {

  @Resource
  private AliPayService aliPayService;
  @Resource
  private OrderService orderService;


  /**
   * 用户创建订单
   * @return
   */
  @PostMapping("/order/{cartIds}")
  @ResponseBody
  public Object createOrder(@PathVariable("cartIds")String[] cartIds, HttpSession session) {
    Order order = orderService.createOrder(cartIds, session);
    return new JsonResult(Constant.SUCCESS_CODE,"订单创建成功",order);
  }

  /**
   * 用户下单
   * @param aliPay
   * @param session
   * @return
   */
  @PostMapping("/pay")
  @ResponseBody
  public Object pay(AliPay aliPay, HttpSession session) {
    return aliPayService.pay(aliPay,session);
  }

  @GetMapping("/pay/success")
  public String success(){
    return "front/pages/pay/success";
  }

}
