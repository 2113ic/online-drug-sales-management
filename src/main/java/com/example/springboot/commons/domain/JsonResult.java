package com.example.springboot.commons.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @program: course-online-display-system
 * @description:
 * @author: yuan
 * @create: 2022-05-07 21:38
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JsonResult {
  private Integer code;
  private String message;
  private int count;
  private Object retData;  //不起data，怕和前端混淆

  public JsonResult(Integer code, String message) {
    this.code = code;
    this.message = message;
  }

  public JsonResult(Integer code, String message, Object data) {
    this.code = code;
    this.message = message;
    this.retData = data;
  }
}
