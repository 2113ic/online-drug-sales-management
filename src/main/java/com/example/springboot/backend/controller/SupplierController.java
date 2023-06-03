package com.example.springboot.backend.controller;

import com.example.springboot.backend.domain.Supplier;
import com.example.springboot.backend.mapper.SupplierMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/backend")
public class SupplierController {

  @Autowired
  private SupplierMapper supplierMapper;

  @RequestMapping("/supplier/queryAll")
  @ResponseBody
  public Object queryAll() {
    List<Supplier> supplierList = supplierMapper.selectAll();
    return supplierList;
  }
}
