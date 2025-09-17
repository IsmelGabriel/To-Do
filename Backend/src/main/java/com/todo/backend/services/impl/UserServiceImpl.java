package com.todo.backend.services.impl;

import com.todo.backend.dto.RegisterRequest;
import com.todo.backend.models.User;
import com.todo.backend.repositories.UserRepository;
import com.todo.backend.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> findByName(String name) {
        return Optional.ofNullable(userRepository.findByName(name));
    }

    @Override
    public void createUser(RegisterRequest registerRequest) {
        User user = new User();
        user.setName(registerRequest.getName());
        // En esta parte la contraseña se encripta
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
    }
}
