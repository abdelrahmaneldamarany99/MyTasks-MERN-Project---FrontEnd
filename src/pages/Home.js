import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

// components
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const { Tasks, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/Tasks");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_Tasks", payload: json });
      }
    };
    fetchTasks();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="Tasks">
        {Tasks ? (
          Tasks.map((Task) => <TaskDetails Task={Task} key={Task._id} />)
        ) : (
          <h1 className="no-tasks">No Tasks Yet</h1>
        )}
      </div>
      <TaskForm />
    </div>
  );
};

export default Home;