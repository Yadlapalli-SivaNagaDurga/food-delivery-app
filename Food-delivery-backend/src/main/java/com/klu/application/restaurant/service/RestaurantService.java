package com.klu.application.restaurant.service;

import java.util.List;

import com.klu.application.restaurant.dto.RestaurantDTO;
import com.klu.application.restaurant.model.FoodItem;
import com.klu.application.restaurant.model.Restaurant;


public interface RestaurantService {

    Restaurant registerRestaurant(Restaurant restaurant);

    Restaurant loginRestaurant(String email, String password);
    
    Restaurant updateProfile(String email, Restaurant restaurant);
    Restaurant getProfile(String email);
    
    List<FoodItem> getAllFoodItems();
    FoodItem updateFoodItem(Long id, FoodItem updatedItem);
    void deleteFoodItem(Long id);
    List<FoodItem> getFoodItems(String anything);

	FoodItem addFoodItem(FoodItem item);
	
	 List<RestaurantDTO> getAllRestaurants(); 
}