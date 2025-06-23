


interface Props {
  title: string;
  description: string;
  setTitle: (t: string) => void;
  setDescription: (t: string) => void;
  onSubmit: () => void;
}

const TaskForm = ({ title, description, setTitle, setDescription, onSubmit }: Props) => {
  return (
    <div>
      <input
        type="text"
        className="flex-2 border border-gray-300 rounded px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una tarea"
      />

      <input
        type="text"
        className="flex-2 border border-gray-300 rounded px-3 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <br/>
      <button className="btn-bg-bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"  onClick={onSubmit}>Guardar</button>
    </div>
  );
};

export default TaskForm;

