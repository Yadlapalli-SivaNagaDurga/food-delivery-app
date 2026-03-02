package com.klu.application.order.service;

import java.util.List;
import java.util.Map;
import com.klu.application.order.model.Order;
import com.klu.application.order.model.OrderResponse;

public interface OrderService {

    String placeOrder(Map<String, Object> payload);

    List<OrderResponse> getOrdersByUser(String userEmail);
    
    List<Order> getPendingOrders();

    Order acceptOrder(Long id, Integer deliveryTime);

    Order rejectOrder(Long id);
    List<Order> getAllOrders();
}