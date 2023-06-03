package com.example.springboot.backend.mapper;

import com.example.springboot.backend.domain.Master;

public interface MasterMapper {
  int deleteByPrimaryKey(String mid);

  int insert(Master record);

  int insertSelective(Master record);

  Master selectByPrimaryKey(String mid);

  int updateByPrimaryKeySelective(Master record);

  int updateByPrimaryKey(Master record);

  Master selectMaster(String account, String password);
}