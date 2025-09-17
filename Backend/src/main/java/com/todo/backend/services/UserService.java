package com.todo.backend.services;

import com.todo.backend.dto.RegisterRequest;
import com.todo.backend.models.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByName(String name);
    void createUser(RegisterRequest registerRequest);
}

