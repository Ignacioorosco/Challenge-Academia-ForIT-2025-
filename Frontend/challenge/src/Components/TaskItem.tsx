
import type  { TareasData  } from "../Utilidades/types";

export const TaskItem = ({ tarea }: { tarea: TareasData }) => (
  <div>
    <h3>Tarea individual</h3>
    <p>{tarea.title}</p>
  </div>
);
