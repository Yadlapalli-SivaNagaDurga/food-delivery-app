package com.klu.application.order.service;

import org.springframework.stereotype.Service;
import java.util.*;

import com.klu.application.order.model.Order;
import com.klu.application.order.model.OrderResponse;
import com.klu.application.order.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;

    public OrderServiceImpl(OrderRepository repository) {
        this.repository = repository;
    }

    // ✅ PLACE ORDER
    @Override
    public String placeOrder(Map<String, Object> payload) {

        String userEmail = (String) payload.get("userEmail");

        List<Map<String, Object>> items =
                (List<Map<String, Object>>) payload.get("items");

        List<String> names = new ArrayList<>();
        double total = 0;

        for (Map<String, Object> item : items) {

            String name = (String) item.get("name");
            double price = Double.parseDouble(item.get("price").toString());
            int qty = Integer.parseInt(item.get("qty").toString());

            names.add(name + " (x" + qty + ")");
            total += price * qty;
        }

        Order order = new Order();
        order.setUserEmail(userEmail);
        order.setItemNames(names);
        order.setTotalAmount(total);

        repository.save(order);

        return "Order placed successfully ✅";
    }

    // ✅ VIEW USER ORDERS (DTO VERSION ONLY)
    @Override
    public List<OrderResponse> getOrdersByUser(String userEmail) {

        return repository.findByUserEmail(userEmail)
                .stream()
                .map(o -> new OrderResponse(
                        o.getId(),
                        o.getTotalAmount(),
                        o.getItemNames(),
                        o.getStatus(),
                        o.getDeliveryTime()
                ))
                .toList();   // ⭐ NOW CORRECTLY PLACED
    }
    
 // =====================================================
    // ✅ RESTAURANT – VIEW PENDING
    // =====================================================
    @Override
    public List<Order> getPendingOrders() {
        return repository.findByStatus("PENDING");
    }
    

    // =====================================================
    // ✅ ACCEPT ORDER
    // =====================================================
    @Override
    public Order acceptOrder(Long id, Integer deliveryTime) {

        Order order = repository.findById(id).orElseThrow();

        order.setStatus("ACCEPTED");
        order.setDeliveryTime(deliveryTime);

        return repository.save(order);
    }
    
 // =====================================================
    // ✅ REJECT ORDER
    // =====================================================
    @Override
    public Order rejectOrder(Long id) {

        Order order = repository.findById(id).orElseThrow();

        order.setStatus("REJECTED");

        return repository.save(order);
    }
    
    @Override
    public List<Order> getAllOrders() {
        return repository.findAll();
    }
}