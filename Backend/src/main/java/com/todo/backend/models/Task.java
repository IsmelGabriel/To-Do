package com.todo.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "tasks")
public class Task {
    @Id
    private Long id;

    public String title;
    public String description;
    public String priority;
    public String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
