package com.klu.application.order.model;

import java.util.List;

public class OrderResponse {

    private Long id;
    private Double totalAmount;
    private List<String> itemNames;
    private String status;
    private Integer deliveryTime;

    public OrderResponse() {
        // Default constructor (recommended)
    }

    public OrderResponse(Long id,
                         Double totalAmount,
                         List<String> itemNames,
                         String status,
                         Integer deliveryTime) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.itemNames = itemNames;
        this.status = status;
        this.deliveryTime = deliveryTime;
    }

    // ✅ GETTERS

    public Long getId() {
        return id;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public List<String> getItemNames() {
        return itemNames;
    }

    public String getStatus() {
        return status;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    // ✅ SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setItemNames(List<String> itemNames) {
        this.itemNames = itemNames;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
}