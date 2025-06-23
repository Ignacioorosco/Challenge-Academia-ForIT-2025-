import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './db.json';

app.use(cors());
app.use(bodyParser.json());

const findData = () => {
  try {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
  } catch (error) {
    console.log('Error al leer el archivo:', error);
    return { Tarea: [] };
  }
};

const mostrarData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.log('Error al guardar los datos:', error);
  }
};

app.get('/tareas', (req, res) => {
  const data = findData();
  res.json(data.Tarea);
});

app.get('/tareas/:id', (req, res) => {
  const data = findData();
  const id = parseInt(req.params.id);
  const encontrada = data.Tarea.find((tarea) => tarea.id === id);
  if (encontrada) {
    res.json(encontrada);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.post('/tareas', (req, res) => {
  const data = findData();
  const body = req.body;
  const nuevaTarea = {
    id: data.Tarea.length ? Math.max(...data.Tarea.map(t => t.id)) + 1 : 1,
    ...body,
  };
  data.Tarea.push(nuevaTarea);
  mostrarData(data);
  res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', (req, res) => {
  const data = findData();
  const id = parseInt(req.params.id);
  const index = data.Tarea.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    data.Tarea[index] = { ...data.Tarea[index], ...req.body };
    mostrarData(data);
    res.json({ message: 'Se actualizó con éxito' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.delete('/tareas/:id', (req, res) => {
  const data = findData();
  const id = parseInt(req.params.id);
  const index = data.Tarea.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    data.Tarea.splice(index, 1);
    mostrarData(data);
    res.json({ message: 'Se eliminó con éxito' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
