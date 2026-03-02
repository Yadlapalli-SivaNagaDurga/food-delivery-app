package com.klu.application.order.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import com.klu.application.order.service.OrderService;
import com.klu.application.order.model.Order;
import com.klu.application.order.model.OrderResponse;
import com.klu.application.order.model.PaymentRequest;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // ✅ PLACE ORDER
    @PostMapping("/place")
    public String placeOrder(@RequestBody Map<String, Object> payload) {
        return service.placeOrder(payload);
    }

    // ✅ SIMULATED PAYMENT
    @PostMapping("/pay")
    public String pay(@RequestBody PaymentRequest request) {

        System.out.println("✅ Payment Received");
        System.out.println("Method: " + request.getMethod());
        System.out.println("Amount: " + request.getAmount());

        return "PAYMENT_SUCCESS";
    }

    @GetMapping("/user/{email}")
    public List<OrderResponse> getUserOrders(@PathVariable String email) {
        return service.getOrdersByUser(email);
    }
    
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }
    
    // ✅ VIEW PENDING ORDERS
    @GetMapping("/pending")
    public List<Order> getPendingOrders() {
        return service.getPendingOrders();
    }

    // ✅ ACCEPT ORDER
    @PutMapping("/accept/{id}")
    public Order acceptOrder(@PathVariable Long id,
                             @RequestParam Integer time) {
        return service.acceptOrder(id, time);
    }

    // ✅ REJECT ORDER
    @PutMapping("/reject/{id}")
    public Order rejectOrder(@PathVariable Long id) {
        return service.rejectOrder(id);
    }
}