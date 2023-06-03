package com.example.springboot.backend.mapper;

import com.example.springboot.backend.domain.Supplier;

import java.util.List;

public interface SupplierMapper {
  int deleteByPrimaryKey(String sid);

  int insert(Supplier record);

  int insertSelective(Supplier record);

  Supplier selectByPrimaryKey(String sid);

  int updateByPrimaryKeySelective(Supplier record);

  int updateByPrimaryKey(Supplier record);

  List<Supplier> selectAll();
}