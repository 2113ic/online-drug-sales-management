package com.example.springboot.front.mapper;

import com.example.springboot.front.domain.Cart;

import java.util.List;
import java.util.Map;

public interface CartMapper {
  int deleteByPrimaryKey(String bid);

  int insert(Map<String, Object> map);

  //根据用户uid查询药品
  List<Cart> selectCartByUid(String uid);

  int updateCart(String bid, Integer count);

  List<Cart> selectAll();
}