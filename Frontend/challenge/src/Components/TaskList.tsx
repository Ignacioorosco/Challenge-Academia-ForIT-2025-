
import type  { TareasData } from "../Utilidades/types";
interface Props {
  tareas: TareasData[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
    onToggle: (tarea: TareasData) => void;
}

export const TaskList = ({ tareas, onDelete, onEdit, onToggle }: Props) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="py-2 px-4 text-left">Título</th>
          <th className="py-2 px-4 text-left">Descripción</th>
          <th className="py-2 px-4 text-center">Completada</th>
          <th className="py-2 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tareas.map((tarea) => (
          <tr key={tarea.id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="py-2 px-4">{tarea.title}</td>
            <td className="py-2 px-4">{tarea.description}</td>
            <td className="py-2 px-4 text-center">
              <input
    type="checkbox"
    checked={tarea.completed}
    onChange={() => onToggle(tarea)}
    className="w-5 h-5"
  />
            </td>
            <td className="py-2 px-4 text-center space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => onEdit(tarea.id)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => onDelete(tarea.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
