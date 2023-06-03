package com.example.springboot.commons.mapper;

import com.example.springboot.commons.domain.OrderDrugRelate;

import java.util.List;

public interface OrderDrugRelateMapper {
    int deleteByOrderId(String orderId);

    int insert(OrderDrugRelate record);

    int insertSelective(OrderDrugRelate record);

    List<OrderDrugRelate> selectByOrderId(String orderId);

    int updateByOrderIdSelective(OrderDrugRelate record);

    int updateByOrderId(OrderDrugRelate record);
}