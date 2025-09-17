const API_BASE_URL = "http://localhost:8080/api/tasks";

export const taskService = {
  getAll: async (token) => {
    const response = await fetch(API_BASE_URL, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Error al obtener tareas");
    return await response.json();
  },

  create: async (task, token) => {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al crear tarea");
    return await response.json();
  },

  update: async (id, task, token) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al actualizar tarea");
    return await response.json();
  },

  remove: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error al eliminar tarea");
  },
};
