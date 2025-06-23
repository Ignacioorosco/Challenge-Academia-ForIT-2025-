import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TareasData } from "../Utilidades/types";
import TaskForm from "../Components/TaskForm";
const apiUrl = import.meta.env.VITE_REACT_API_URL

export const EditTask = () => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTarea = async () => {
      const res = await fetch(`${apiUrl}/${id}`);
      const data: TareasData = await res.json();
      setTitle(data.title);
      setDescription(data.description || ""); 
    };
    fetchTarea();
  }, [id]);

  const updateTarea = async () => {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: description }), 
    });
    navigate("/");
  };

  return (
    <div>
      <h1 className="font-bold text-xl">Editar tarea</h1>
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={updateTarea}
      />
    </div>
  );
};
