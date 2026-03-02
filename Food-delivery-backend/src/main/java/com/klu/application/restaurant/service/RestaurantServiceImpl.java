package com.klu.application.restaurant.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.klu.application.restaurant.dto.RestaurantDTO;
import com.klu.application.restaurant.model.*;
import com.klu.application.restaurant.repository.*;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository repository;
    private final FoodItemRepository foodItemRepository;

    public RestaurantServiceImpl(RestaurantRepository repository,
                                 FoodItemRepository foodItemRepository) {
        this.repository = repository;
        this.foodItemRepository = foodItemRepository;
    }

    // ✅ REGISTER
    @Override
    public Restaurant registerRestaurant(Restaurant restaurant) {
        return repository.save(restaurant);
    }

    // ✅ LOGIN
    @Override
    public Restaurant loginRestaurant(String email, String password) {

        Restaurant existingRestaurant = repository.findByEmail(email);

        if (existingRestaurant != null &&
            existingRestaurant.getPassword().equals(password)) {

            return existingRestaurant;
        }

        return null;
    }

    // ✅ UPDATE PROFILE
    @Override
    public Restaurant updateProfile(String email, Restaurant updatedRestaurant) {

        Restaurant existingRestaurant = repository.findByEmail(email);

        if (existingRestaurant == null) return null;

        existingRestaurant.setName(updatedRestaurant.getName());
        existingRestaurant.setLocation(updatedRestaurant.getLocation());
        existingRestaurant.setPhone(updatedRestaurant.getPhone());
        existingRestaurant.setDescription(updatedRestaurant.getDescription());

        return repository.save(existingRestaurant);
    }

    // ✅ GET PROFILE
    @Override
    public Restaurant getProfile(String email) {
        return repository.findByEmail(email);
    }

    // =====================================================
    // ✅ FOOD ITEM OPERATIONS
    // =====================================================

    // ✅ ADD FOOD ITEM
    @Override
    public FoodItem addFoodItem(FoodItem item) {
        return foodItemRepository.save(item);
    }

    // ✅ VIEW ALL FOOD ITEMS
    @Override
    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    // ✅ UPDATE FOOD ITEM
    @Override
    public FoodItem updateFoodItem(Long id, FoodItem updatedItem) {

        FoodItem existingItem = foodItemRepository.findById(id).orElse(null);

        if (existingItem == null) return null;

        existingItem.setName(updatedItem.getName());
        existingItem.setPrice(updatedItem.getPrice());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setImageName(updatedItem.getImageName());

        return foodItemRepository.save(existingItem);
    }

    // ✅ DELETE FOOD ITEM
    @Override
    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }

    // ✅ REQUIRED METHOD FROM INTERFACE (Fixes your error)
    @Override
    public List<FoodItem> getFoodItems(String anything) {
        return foodItemRepository.findAll();
    }
    
    @Override
    public List<RestaurantDTO> getAllRestaurants() {

        return repository.findAll()
                .stream()
                .map(r -> new RestaurantDTO(
                        r.getId(),
                        r.getName(),
                        r.getLocation(),
                        r.getPhone(),
                        r.getDescription()
                ))
                .collect(Collectors.toList());
    }
}