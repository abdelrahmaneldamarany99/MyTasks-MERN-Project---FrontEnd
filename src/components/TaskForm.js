import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();

  const [task, setTask] = useState("");
  const [importance, setImportance] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Task = { task, importance, deadline };

    const response = await fetch("/api/Tasks", {
      method: "POST",
      body: JSON.stringify(Task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTask("");
      setImportance("");
      setDeadline("");
      dispatch({ type: "CREATE_Task", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task Title:</label>
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        className={emptyFields.includes("task") ? "error" : ""}
      />

      <label>Importance ( 5 for most important , 1 for least ):</label>
      <select
        onChange={(e) => setImportance(e.target.value)}
        value={importance}
        className='select-importance'
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label>Deadline: ( Month - Day - Year )</label>
      <input
        type="text"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        className={emptyFields.includes("deadline") ? "error" : ""}
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
