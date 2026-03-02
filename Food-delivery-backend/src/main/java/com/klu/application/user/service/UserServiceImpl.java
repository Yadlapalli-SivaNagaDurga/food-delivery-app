package com.klu.application.user.service;

import org.springframework.stereotype.Service;
import com.klu.application.user.model.User;
import com.klu.application.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    // ✅ REGISTER USER
    @Override
    public User registerUser(User user) {
        return repository.save(user);
    }

    // ✅ LOGIN USER
    @Override
    public User loginUser(String email, String password) {

        User existingUser = repository.findByEmail(email);

        if (existingUser != null &&
            existingUser.getPassword().equals(password)) {

            return existingUser;
        }

        return null;
    }
}