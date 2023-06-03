package com.example.springboot.commons.domain;

public class OrderDrugRelate {
    private String orderId;

    private String drugId;

    private Long drugCount;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getDrugId() {
        return drugId;
    }

    public void setDrugId(String drugId) {
        this.drugId = drugId;
    }

    public Long getDrugCount() {
        return drugCount;
    }

    public void setDrugCount(Long drugCount) {
        this.drugCount = drugCount;
    }
}