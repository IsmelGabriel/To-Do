package com.todo.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String password;
}
