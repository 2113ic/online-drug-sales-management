package com.example.springboot.commons.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author xiaoyan
 * @date 2022-05-20 19:34
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrugTemp {
  public String did;
  public String name;
  public List<String> cover;
  public float price;
  public String type;
  public String sort;
  public String traits;
  public String function;
  public String format;
  public String store;
  public String eat;
  public String bad;
  public String ban;
  public String note;
  public String company;
  public String shelfLife;
  public long count;

}
