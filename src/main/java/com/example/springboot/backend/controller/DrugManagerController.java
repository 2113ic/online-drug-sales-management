package com.example.springboot.backend.controller;

import com.example.springboot.commons.constant.Constant;
import com.example.springboot.commons.domain.Drug;
import com.example.springboot.commons.domain.JsonResult;
import com.example.springboot.commons.mapper.DrugMapper;
import com.example.springboot.commons.util.POIUtils;
import com.example.springboot.commons.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/backend")
public class DrugManagerController {
  @Autowired
  private DrugMapper drugMapper;

  @RequestMapping("/drug/queryAll")
  @ResponseBody
  public Object queryAll(Integer page, Integer limit) {
    Integer size = limit;
    //计算从第几条数据开始显示
    int begin = (page - 1) * size;
    try {
      List<Drug> drugList = drugMapper.selectAll(begin, size);
      int count = drugMapper.selectCount();
      return new JsonResult(Constant.SUCCESS_CODE, "查询成功", count, drugList);
    } catch (Exception e) {
      e.printStackTrace();
      return new JsonResult(Constant.FAILURE_CODE, "查询药物失败");
    }
  }

  //查询库存量低于某个值的药物
  @RequestMapping("/drug/queryDrugByCount")
  @ResponseBody
  public Object queryDrugByCount() {
    List<Drug> drugList = drugMapper.selectDrugByCount(1000);
    return drugList;
  }

  @RequestMapping("/drug/upload/importDrugMessage")
  @ResponseBody
  public Object importDrugMessage(@RequestParam("excelFile") MultipartFile excelFile) {
    try {
      //String[]中的数据就是表中各行的字段内容
      List<String[]> list = POIUtils.readExcel(excelFile);  //解析表格数据
      List<Drug> drugList = new ArrayList<>();
      for (String[] str : list) {
        String name = str[0];
        String cover = str[1];
        Float price = Float.valueOf(str[2]);
        String type = str[3];
        String sort = str[4];
        String traits = str[5];
        String function = str[6];
        String format = str[7];
        String store = str[8];
        String eat = str[9];
        String bad = str[10];
        String ban = str[11];
        String note = str[12];
        String company = str[13];
        String shelflife = str[14];
        long count = Long.valueOf(str[15]);
        Drug drug = new Drug(
          UUIDUtils.getUUID(), name, cover, price, type, sort,
          traits, function, format, store, eat, bad, ban, note, company, shelflife, count
        );
        drugList.add(drug);
      }
      //将数据插入到数据库中
      try {
        int i = drugMapper.insertBatch(drugList);
        if (i > 0) {
          return new JsonResult(Constant.SUCCESS_CODE, "导入成功");
        } else {
          return new JsonResult(Constant.FAILURE_CODE, "导入失败");
        }
      } catch (Exception e) {
        e.printStackTrace();
        return new JsonResult(Constant.FAILURE_CODE, "系统繁忙，请稍后重试...");
      }

    } catch (IOException e) {
      e.printStackTrace();
      //文件解析失败
      return new JsonResult(Constant.FAILURE_CODE, "导入失败");
    }
  }
}
