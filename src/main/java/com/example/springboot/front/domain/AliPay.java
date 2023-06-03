package com.example.springboot.front.domain;

import com.example.springboot.commons.domain.Drug;
import lombok.Data;

import java.util.List;

/**
 * @author Yuan
 * @description
 * @date 2023/3/8
 */
@Data
public class AliPay {
  /**
   * 订单号
   */
  private String traceNo;
  /**
   * 总金额
   */
  private double totalAmount;
  /**
   * 药物名称...
   */
  private String subject;

  /**
   * 药物信息
   */
  private List<Drug> drugList;
}
