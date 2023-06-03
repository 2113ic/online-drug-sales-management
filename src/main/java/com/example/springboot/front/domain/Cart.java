package com.example.springboot.front.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
  private String bid;

  private String did;

  private Integer count;

  private String cover;

  private String name;

  private String price;

  private String format;
}