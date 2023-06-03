package com.example.springboot.backend.controller;

import com.example.springboot.front.domain.Cart;
import com.example.springboot.front.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/backend")
public class SalesController {
  @Autowired
  private CartMapper cartMapper;

  @RequestMapping("/sale/queryCartMessage")
  @ResponseBody
  public Object queryCartMessage() {
    List<Cart> cartList = cartMapper.selectAll();
    return cartList;
  }
}
