package com.klu.application.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.application.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}