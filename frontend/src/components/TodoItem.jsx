import React from "react";
import "./TodoItem.css";

function TodoItem({ todo, onUpdateStatus, onUpdatePriority, onDelete }) {
  return (
    <div className="todo-item">
      <div className="todo-info">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <p>
          <strong>Prioridad:</strong> {todo.priority}
        </p>
        <p>
          <strong>Estado:</strong> {todo.status}
        </p>
      </div>

      <div className="todo-actions">
        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo.id, e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>

        <select
          value={todo.priority}
          onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
