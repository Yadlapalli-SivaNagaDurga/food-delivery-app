package com.klu.application.user.controller;

import org.springframework.web.bind.annotation.*;
import com.klu.application.user.model.User;
import com.klu.application.user.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // ✅ USER REGISTRATION
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return service.registerUser(user);
    }

    // ✅ USER LOGIN
    @PostMapping("/login")
    public User loginUser(@RequestParam String email,
                          @RequestParam String password) {
        return service.loginUser(email, password);
    }
}