import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdateStatus, onUpdatePriority }) => {
  const priorityOptions = ['Baja', 'Media', 'Alta'];
  const statusOptions = ['Pendiente', 'En Progreso', 'Completada'];

  return (
    <div className="todo-item" data-status={todo.estado}>
      <div className="todo-content">
        <h3>{todo.titulo}</h3>
        <p className="description">{todo.descripcion}</p>
      </div>
      <div className="todo-controls">
        <div className="control-group">
          <label>Prioridad:</label>
          <select
            value={todo.prioridad}
            onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
            className={`priority-select priority-${todo.prioridad.toLowerCase()}`}
          >
            {priorityOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>Estado:</label>
          <select
            value={todo.estado}
            onChange={(e) => onUpdateStatus(todo.id, e.target.value)}
            className={`status-select status-${todo.estado.toLowerCase().replace(' ', '-')}`}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;