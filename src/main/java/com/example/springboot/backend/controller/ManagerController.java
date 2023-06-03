package com.example.springboot.backend.controller;

import com.example.springboot.backend.domain.Master;
import com.example.springboot.backend.mapper.MasterMapper;
import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.JsonResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/backend")
public class ManagerController {
  @Resource
  private MasterMapper masterMapper;

  @RequestMapping("/manager/login")
  @ResponseBody
  public Object login(String account, String password) {
    Master master = masterMapper.selectMaster(account, password);
    if (master != null) {
      //用户存在可登录
      return new JsonResult(Constant.SUCCESS_CODE, "登录成功", master);
    } else {
      return new JsonResult(Constant.FAILURE_CODE, "账户或密码错误");
    }

  }
}
