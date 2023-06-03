package com.example.springboot.front.controller;

import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.JsonResult;
import com.example.springboot.commons.util.UUIDUtils;
import com.example.springboot.front.domain.Cart;
import com.example.springboot.front.mapper.CartMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CartController {
  @Resource
  private CartMapper cartMapper;

  //显示购物车药品
  @RequestMapping("/front/cart/showCart")
  @ResponseBody
  public Object showCart(String uid) {
    List<Cart> cartList = cartMapper.selectCartByUid(uid);
    return cartList;
  }

  //加入购物车
  @RequestMapping("/front/cart/addCart")
  @ResponseBody
  public Object addCart(String uid, String did, String count) {
    Map<String, Object> map = new HashMap<>();
    map.put("bid", UUIDUtils.getUUID());
    map.put("uid", uid);
    map.put("did", did);
    map.put("count", count);
    try {
      int result = cartMapper.insert(map);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "添加成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "添加失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
    }
  }

  //更新购物车
  @RequestMapping("/front/cart/updateCart")
  @ResponseBody
  public Object updateCart(String bid, Integer count) {
    try {
      int result = cartMapper.updateCart(bid, count);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "更新成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "更新失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
    }
  }

  //删除购物车
  @RequestMapping("/front/cart/deleteCart")
  @ResponseBody
  public Object deleteCart(String bid) {
    try {
      int result = cartMapper.deleteByPrimaryKey(bid);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "删除成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "删除失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
    }
  }
}
