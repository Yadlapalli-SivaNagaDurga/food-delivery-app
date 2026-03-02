package com.klu.application.restaurant.dto;

public class RestaurantDTO {

    private Long id;
    private String name;
    private String location;
    private String phone;
    private String description;

    public RestaurantDTO(Long id, String name,
                         String location,
                         String phone,
                         String description) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.phone = phone;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getPhone() { return phone; }
    public String getDescription() { return description; }
}