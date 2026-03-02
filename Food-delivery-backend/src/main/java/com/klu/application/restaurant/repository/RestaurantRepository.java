package com.klu.application.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.application.restaurant.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Custom query for login
    Restaurant findByEmail(String email);
  
}