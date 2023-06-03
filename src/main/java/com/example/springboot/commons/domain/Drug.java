package com.example.springboot.commons.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drug {
  private String did;

  private String name;

  private String cover;

  private Float price;

  private String type;

  private String sort;

  private String traits;

  private String function;

  private String format;

  private String store;

  private String eat;

  private String bad;

  private String ban;

  private String note;

  private String company;

  private String shelflife;

  private Long count;

}