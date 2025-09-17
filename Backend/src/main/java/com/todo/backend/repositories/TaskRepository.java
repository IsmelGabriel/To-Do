package com.todo.backend.repositories;

import com.todo.backend.models.Task;
import com.todo.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(Optional<User> user);
}
