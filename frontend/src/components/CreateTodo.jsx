import React, { useState } from 'react';
import './CreateTodo.css';

const CreateTodo = ({ isOpen, onClose, onCreateTodo }) => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    priority: 'Media',
    state: 'Pendiente'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoData);
    setTodoData({
      title: '',
      description: '',
      priority: 'Media',
      state: 'Pendiente'
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Crear Nueva Tarea</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={todoData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={todoData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select
              id="priority"
              name="priority"
              value={todoData.priority}
              onChange={handleChange}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;