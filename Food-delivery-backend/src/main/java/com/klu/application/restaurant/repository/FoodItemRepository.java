package com.klu.application.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.application.restaurant.model.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

}