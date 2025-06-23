import { useEffect, useState } from "react";
import { TaskList } from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";
import type { TareasData } from "../Utilidades/types";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_API_URL;


export const Home = () => {
  const [tareas, setTareas] = useState<TareasData[]>([]);   
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

  const navigate = useNavigate();
  
const toggleCompleted = async (tarea: TareasData) => {
  await fetch(`${apiUrl}/${tarea.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...tarea,
      completed: !tarea.completed,
    }),
  });
  fetchTareas();
};



  const fetchTareas = async () => {
    const res = await fetch(`${apiUrl}`);
    const data = await res.json();
    console.log("data",data)
    setTareas(data);
  };

const createTarea = async () => {
  await fetch(`${apiUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, completed: false, createdAt: new Date() }),
  });
  setTitle("");
  setDescription("");
  fetchTareas();
};
  const deleteTarea = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTareas();
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div>
    <h1 className="font-bold text-xl">Lista de tareas</h1>
     <TaskForm
  title={title}
  description={description}
  setTitle={setTitle}
  setDescription={setDescription}
  onSubmit={createTarea}
/>
    <TaskList
  tareas={tareas}
  onDelete={deleteTarea}
  onEdit={handleEdit}
  onToggle={toggleCompleted}
/>





    </div>


  );
};
