package com.example.springboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan({
  "com.example.springboot.front.mapper",
  "com.example.springboot.backend.mapper",
  "com.example.springboot.commons.mapper"
})
@SpringBootApplication
public class OnlineDrugSalesManagementApplication {

  public static void main(String[] args) {
    SpringApplication.run(OnlineDrugSalesManagementApplication.class, args);
  }

}
