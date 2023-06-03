package com.example.springboot.front.controller;

import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.JsonResult;
import com.example.springboot.commons.domain.Order;
import com.example.springboot.commons.mapper.OrderMapper;
import com.example.springboot.commons.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Yuan
 * @description
 * @date 2023/5/9
 */
@RestController
@RequestMapping("front")
public class OrderController {

  @Resource
  private OrderService orderService;

  @GetMapping("/order")
  public Object list(){
    List<Order> orderList = orderService.list();
    return new JsonResult(Constant.SUCCESS_CODE,"获取订单信息成功",orderList);
  }
}
