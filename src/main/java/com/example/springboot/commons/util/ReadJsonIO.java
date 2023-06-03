package com.example.springboot.commons.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class ReadJsonIO {
  public static String readJson(String jsonPath) {
    File jsonFile = new File(jsonPath);
    try {
      FileReader fileReader = new FileReader(jsonFile);
      BufferedReader reader = new BufferedReader(fileReader);
      StringBuilder sb = new StringBuilder();
      while (true) {
        int ch = reader.read();
        if (ch != -1) {
          sb.append((char) ch);
        } else {
          break;
        }
      }
      fileReader.close();
      reader.close();
      return sb.toString();
    } catch (IOException e) {
      return "";
    }
  }
}
