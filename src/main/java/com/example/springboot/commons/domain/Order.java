package com.example.springboot.commons.domain;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Order {
    private String id;

    private String uid;

    private String username;

    private Date createTime;

    private Date orderTime;

    private List<Drug> drug;

    private String userAddress;

    private String state;
}