package com.example.springboot.commons.mapper;

import com.example.springboot.commons.domain.User;

import java.util.List;

public interface UserMapper {
  int deleteByPrimaryKey(String uid);

  int insert(User record);

  int insertSelective(User record);

  User selectByPrimaryKey(String uid);

  int updateByPrimaryKeySelective(User record);

  int updateByPrimaryKey(User record);

  User selectUser(User user);

  //根据uid查询用户名
  User selectUserByUid(String uid);

  //根据手机号修改密码
  int updatePasswordByPhone(String phone, String password);

  int updateNameByUid(String uid, String name);

  List<User> selectAll();

  int updateAddressByUid(String uid, String address);
}