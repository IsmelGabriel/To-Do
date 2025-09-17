import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";
import { taskService } from "../services/taskService";
import "./Dashboard.css";

function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // guardado en login

  // 🔹 Cargar tareas al iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getAll(token);
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTasks();
  }, [token]);

  // 🔹 Actualizar estado
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const task = todos.find((t) => t.id === id);
      if (!task) return;
      const updated = await taskService.update(
        id,
        { ...task, status: newStatus },
        token
      );
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Actualizar prioridad
  const handleUpdatePriority = async (id, newPriority) => {
    try {
      const task = todos.find((t) => t.id === id);
      if (!task) return;
      const updated = await taskService.update(
        id,
        { ...task, priority: newPriority },
        token
      );
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Crear tarea
  const handleCreateTodo = async (newTodo) => {
    try {
      const created = await taskService.create(newTodo, token);
      setTodos([...todos, created]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await taskService.remove(id, token);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <h1>Lista de Tareas</h1>
          <button
            className="create-todo-button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Nueva Tarea
          </button>
        </div>
      </header>

      <CreateTodo
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTodo={handleCreateTodo}
      />

      <div className="todos-container">
        {todos.length === 0 ? (
          <p>No hay tareas aún</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdateStatus={handleUpdateStatus}
              onUpdatePriority={handleUpdatePriority}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
