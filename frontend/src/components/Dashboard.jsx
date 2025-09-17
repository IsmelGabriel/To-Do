import React, { useState } from 'react';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import './Dashboard.css';

function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Esta es una simulación de datos. En un caso real, estos vendrían de tu base de datos
  const [todos, setTodos] = useState([
    {
      id: 1,
      titulo: "Completar el proyecto",
      descripcion: "Terminar el desarrollo del dashboard de ToDo",
      prioridad: "Alta",
      estado: "En Progreso"
    },
    {
      id: 2,
      titulo: "Reunión de equipo",
      descripcion: "Preparar presentación para la reunión semanal",
      prioridad: "Media",
      estado: "Pendiente"
    },
    {
      id: 3,
      titulo: "Actualizar documentación",
      descripcion: "Actualizar la documentación del proyecto",
      prioridad: "Baja",
      estado: "Completada"
    }
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, estado: newStatus } : todo
    ));
  };

  const handleUpdatePriority = (id, newPriority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, prioridad: newPriority } : todo
    ));
  };

  const handleCreateTodo = (newTodo) => {
    // Generar un ID temporal (en producción, el backend asignaría el ID)
    const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    setTodos([...todos, { ...newTodo, id }]);
  };

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
        <div className="filters">
          <select className="filter-select">
            <option value="todas">Todas las prioridades</option>
            <option value="alta">Alta prioridad</option>
            <option value="media">Media prioridad</option>
            <option value="baja">Baja prioridad</option>
          </select>
          <select className="filter-select">
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </header>
      
      <CreateTodo 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTodo={handleCreateTodo}
      />
      <div className="todos-container">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePriority={handleUpdatePriority}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;