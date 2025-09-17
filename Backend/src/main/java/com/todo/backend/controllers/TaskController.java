package com.todo.backend.controllers;

import com.todo.backend.models.Task;
import com.todo.backend.models.User;
import com.todo.backend.services.TaskService;
import com.todo.backend.services.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public List<Task> getTasks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByName(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return taskService.getTasksByUser(Optional.ofNullable(user));
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByName(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        task.setUser(user);
        return taskService.create(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.update(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }
}
