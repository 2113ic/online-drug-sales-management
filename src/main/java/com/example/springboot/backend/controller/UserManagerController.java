package com.example.springboot.backend.controller;

import com.example.springboot.commons.domain.User;
import com.example.springboot.commons.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/backend")
public class UserManagerController {
  @Autowired
  private UserMapper userMapper;

  //查询用户所有信息
  @RequestMapping("/user/queryAll")
  @ResponseBody
  public Object queryAll() {
    List<User> userList = userMapper.selectAll();
    return userList;
  }
}
