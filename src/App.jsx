import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([
    { title: "React Dashboard", status: "Completed" },
    { title: "Docker Setup", status: "Pending" },
  ]);

  const addTask = () => {
    if (task === "") return;

    setTasks([...tasks, { title: task, status: "Pending" }]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleStatus = (index) => {
    const updated = [...tasks];

    updated[index].status =
      updated[index].status === "Pending"
        ? "Completed"
        : "Pending";

    setTasks(updated);
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <h2>My DevOps Tasks</h2>

          <div className="inputBox">
            <input
              type="text"
              placeholder="Enter new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={addTask}>Add</button>
          </div>

          {tasks.map((item, index) => (
            <TaskCard
              key={index}
              title={item.title}
              status={item.status}
              onDelete={() => deleteTask(index)}
              onToggle={() => toggleStatus(index)}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;