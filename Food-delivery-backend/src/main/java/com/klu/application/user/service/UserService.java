package com.klu.application.user.service;

import com.klu.application.user.model.User;

public interface UserService {

    User registerUser(User user);

    User loginUser(String email, String password);
}