package com.example.springboot.front.controller;

import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.JsonResult;
import com.example.springboot.commons.domain.User;
import com.example.springboot.commons.mapper.UserMapper;
import com.example.springboot.commons.util.UUIDUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
@Slf4j
public class UserController {
  @Resource
  private UserMapper userMapper;

  //注册验证
  @RequestMapping("/front/user/regist")
  @ResponseBody
  public Object regist(String name, String phone, String password) {
    User user = userMapper.selectUser(new User(null, name, password, phone, null));
    //如果为空用户不存在
    if (user != null) {
      return new JsonResult(Constant.FAILURE_CODE, "用户已存在");
    } else {
      //用户不存在，可以进行插入操作
      int result = 0;
      try {
        user = new User(UUIDUtils.getUUID(), name, password, phone, null);
        result = userMapper.insertSelective(user);
        if (result > 0) {
          //注册成功
          return new JsonResult(Constant.SUCCESS_CODE, "注册成功", user);
        } else {
          return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
        }
      } catch (Exception e) {
        e.printStackTrace();
        return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
      }
    }
  }

  //登录测试
  @PostMapping("/front/user/login")
  @ResponseBody
  public Object login(String phone, String password, HttpSession session) {
    System.out.println(phone);
    System.out.println(password);
    User user = userMapper.selectUser(new User(null, null, password, phone, null));
    //不为空，用户存在，可登录
    if (user != null) {
      log.info("登录成功");
      //登录成功，将用户信息存储到session中
      session.setAttribute(Constant.SESSION_USER, user);
      System.out.println("=====" + user + "=====");
      return new JsonResult(Constant.SUCCESS_CODE, "登陆成功", user);
    } else {
      return new JsonResult(Constant.FAILURE_CODE, "手机号或密码不正确");
    }
  }

  //根据手机号获取用户名称
  @RequestMapping("/front/user/getUserName")
  @ResponseBody
  public Object getUserName(String uid) {
    User user = userMapper.selectUserByUid(uid);
    return user;
  }

  //修改用户名称
  @RequestMapping("/front/user/updateName")
  @ResponseBody
  public Object updateName(String uid, String name) {
    try {
      int result = userMapper.updateNameByUid(uid, name);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "修改昵称成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "修改昵称失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试");
    }
  }

  @RequestMapping("/front/user/updatePassword")
  @ResponseBody
  public Object updatePassword(String phone, String password) {
    try {
      int result = userMapper.updatePasswordByPhone(phone, password);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "修改密码成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "修改密码失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
    }
  }

  @RequestMapping("/front/user/updateAddress")
  @ResponseBody
  public Object updateAddress(String uid, String address) {
    try {
      int result = userMapper.updateAddressByUid(uid, address);
      if (result > 0) {
        return new JsonResult(Constant.SUCCESS_CODE, "修改地址成功");
      } else {
        return new JsonResult(Constant.FAILURE_CODE, "修改地址失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试");
    }
  }
}
