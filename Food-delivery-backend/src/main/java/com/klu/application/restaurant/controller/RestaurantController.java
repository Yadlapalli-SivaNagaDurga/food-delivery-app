package com.klu.application.restaurant.controller;

import org.springframework.web.bind.annotation.*;
import com.klu.application.restaurant.model.Restaurant;
import com.klu.application.restaurant.service.RestaurantService;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.io.File;
import java.util.List;

import com.klu.application.restaurant.dto.RestaurantDTO;
import com.klu.application.restaurant.model.FoodItem;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin
public class RestaurantController {

    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    // =====================================================
    // ✅ RESTAURANT APIs
    // =====================================================

    @PostMapping("/register")
    public Restaurant registerRestaurant(@RequestBody Restaurant restaurant) {
        return service.registerRestaurant(restaurant);
    }

    @PostMapping("/login")
    public Restaurant loginRestaurant(@RequestParam String email,
                                     @RequestParam String password) {
        return service.loginRestaurant(email, password);
    }

    @GetMapping("/profile/{email}")
    public Restaurant getProfile(@PathVariable String email) {
        return service.getProfile(email);
    }

    @PutMapping("/profile/{email}")
    public Restaurant updateProfile(@PathVariable String email,
                                    @RequestBody Restaurant restaurant) {
        return service.updateProfile(email, restaurant);
    }

    // =====================================================
    // ✅ FOOD ITEM UPLOAD WITH IMAGE
    // =====================================================

    @PostMapping("/food-items/upload")
    public FoodItem uploadFoodItem(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("email") String email) throws Exception {

        String uploadDir = "uploads/";

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, file.getBytes());

        FoodItem item = new FoodItem();
        item.setName(name);
        item.setPrice(price);
        item.setDescription(description);
        item.setRestaurantEmail(email);
        item.setImageName(fileName);

        return service.addFoodItem(item);
    }

    // =====================================================
    // ✅ VIEW ALL FOOD ITEMS (YOUR REQUIREMENT)
    // =====================================================

    @GetMapping("/food-items")
    public List<FoodItem> getAllFoodItems() {
        return service.getAllFoodItems();
    }

    // =====================================================
    // ✅ UPDATE FOOD ITEM
    // =====================================================

    @PutMapping("/food-items/{id}")
    public FoodItem updateFoodItem(@PathVariable Long id,
                                   @RequestBody FoodItem item) {
        return service.updateFoodItem(id, item);
    }

    // =====================================================
    // ✅ DELETE FOOD ITEM
    // =====================================================

    @DeleteMapping("/food-items/{id}")
    public String deleteFoodItem(@PathVariable Long id) {
        service.deleteFoodItem(id);
        return "Food Item Deleted Successfully";
    }
    
    @GetMapping("/all")
    public List<RestaurantDTO> getAllRestaurants() {
        return service.getAllRestaurants();
    }
}