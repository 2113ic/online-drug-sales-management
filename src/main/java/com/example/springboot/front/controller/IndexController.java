package com.example.springboot.front.controller;

import com.example.springboot.commons.domain.Drug;
import com.example.springboot.commons.mapper.DrugMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class IndexController {

  @Autowired
  private DrugMapper drugMapper;

  @RequestMapping("/front/drug/queryDrugByType")
  @ResponseBody
  public Object queryDrugByType(String type) {
    List<Drug> drugList = drugMapper.selectDrugByType(type);
    return drugList;
  }

  //根据类型模糊查询
  @RequestMapping("/front/drug/searchDrug")
  @ResponseBody
  public Object queryDrugByName(String searchText) {
    List<Drug> drugList = drugMapper.selectDrugByName(searchText);
    if (drugList.size() == 0) {
      //根据主治功能查询
      drugList = drugMapper.selectDrugByFunction(searchText);
    }
    return drugList;
  }

  //查看药物详情
  @RequestMapping("/front/drug/queryDetail")
  @ResponseBody
  public Object queryDetail(String did) {
    Drug drug = drugMapper.selectByPrimaryKey(did);
    return drug;
  }

}
