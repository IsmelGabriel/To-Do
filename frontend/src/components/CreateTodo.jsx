import React, { useState } from 'react';
import './CreateTodo.css';

const CreateTodo = ({ isOpen, onClose, onCreateTodo }) => {
  const [todoData, setTodoData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    estado: 'Pendiente'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoData);
    setTodoData({
      titulo: '',
      descripcion: '',
      prioridad: 'Media',
      estado: 'Pendiente'
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
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={todoData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={todoData.descripcion}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prioridad">Prioridad</label>
            <select
              id="prioridad"
              name="prioridad"
              value={todoData.prioridad}
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