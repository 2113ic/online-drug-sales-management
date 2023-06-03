package com.example.springboot;

import com.alibaba.fastjson.JSON;
import com.example.springboot.commons.domain.Drug;
import com.example.springboot.commons.domain.DrugTemp;
import com.example.springboot.commons.mapper.DrugMapper;
import com.example.springboot.commons.util.ReadJsonIO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class OnlineDrugSalesManagementApplicationTests {

  @Autowired
  private DrugMapper drugMapper;

  @Test
  void contextLoads() {
    String str = ReadJsonIO.readJson("src/main/resources/static/drugs.json");
    List<DrugTemp> d = JSON.parseArray(str, DrugTemp.class);
    List<Drug> drugList = new ArrayList<>();
    StringBuilder coverStr = new StringBuilder();
    Drug drug = null;

    //拼接封面
    for (DrugTemp item : d) {
      //将封面字段遍历重新封装到drug
      for (String s : item.cover) {
        coverStr.append(s).append("$$");
      }
      drug = new Drug(
        item.did,
        item.name,
        coverStr.toString(),
        item.price,
        item.type,
        item.sort,
        item.traits,
        item.function,
        item.format,
        item.store,
        item.eat,
        item.bad,
        item.ban,
        item.note,
        item.company,
        item.shelfLife,
        item.count
      );
      drugList.add(drug);
      coverStr = new StringBuilder();
    }

    //将集合传递给mapper
    drugMapper.insertBatch(drugList);
  }

}
