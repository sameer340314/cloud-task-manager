import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";

function App() {
  // =========================
  // Task Form
  // =========================

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // =========================
  // Settings
  // =========================

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // =========================
  // Search / Filter / Sort
  // =========================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // =========================
  // Edit Task
  // =========================

  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  // =========================
  // Tasks
  // =========================

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(
        "cloudTaskManagerTasks"
      );

      if (savedTasks) {
        return JSON.parse(savedTasks);
      }
    } catch (error) {
      console.error(
        "Error loading tasks from LocalStorage:",
        error
      );
    }

    return [
      {
        title: "React Dashboard",
        description: "Complete the frontend dashboard",
        priority: "High",
        dueDate: "2026-09-05",
        status: "Completed",
      },
      {
        title: "Docker Setup",
        description: "Build and test Docker container",
        priority: "Medium",
        dueDate: "2026-09-06",
        status: "Pending",
      },
    ];
  });

  // =========================
  // Save Tasks
  // =========================

  useEffect(() => {
    try {
      localStorage.setItem(
        "cloudTaskManagerTasks",
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error(
        "Error saving tasks to LocalStorage:",
        error
      );
    }
  }, [tasks]);

  // =========================
  // Dashboard Statistics
  // =========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (item) => item.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    (item) => item.priority === "High"
  ).length;

  // =========================
  // Add Task
  // =========================

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      title: task.trim(),
      description: description.trim(),
      priority: priority,
      dueDate: dueDate,
      status: "Pending",
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setTask("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  // =========================
  // Delete Task
  // =========================

  const deleteTask = (index) => {
    setTasks((currentTasks) =>
      currentTasks.filter((_, i) => i !== index)
    );
  };

  // =========================
  // Toggle Task Status
  // =========================

  const toggleStatus = (index) => {
    setTasks((currentTasks) =>
      currentTasks.map((item, i) =>
        i === index
          ? {
              ...item,
              status:
                item.status === "Pending"
                  ? "Completed"
                  : "Pending",
            }
          : item
      )
    );
  };

  // =========================
  // Start Edit
  // =========================

  const startEdit = (index) => {
    const item = tasks[index];

    setEditingIndex(index);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditPriority(item.priority);
    setEditDueDate(item.dueDate || "");
  };

  // =========================
  // Save Edit
  // =========================

  const saveEdit = () => {
    if (editingIndex === null) {
      return;
    }

    if (editTitle.trim() === "") {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((item, i) =>
        i === editingIndex
          ? {
              ...item,
              title: editTitle.trim(),
              description: editDescription.trim(),
              priority: editPriority,
              dueDate: editDueDate,
            }
          : item
      )
    );

    cancelEdit();
  };

  // =========================
  // Cancel Edit
  // =========================

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("Medium");
    setEditDueDate("");
  };

  // =========================
  // Search + Filters
  // =========================

  const filteredTasks = tasks.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      item.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // =========================
  // Sorting
  // =========================

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => {
      if (sortBy === "Priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }

      if (sortBy === "Due Date") {
        if (!a.dueDate && !b.dueDate) {
          return 0;
        }

        if (!a.dueDate) {
          return 1;
        }

        if (!b.dueDate) {
          return -1;
        }

        return a.dueDate.localeCompare(b.dueDate);
      }

      if (sortBy === "Status") {
        return a.status.localeCompare(b.status);
      }

      return 0;
    }
  );

  // =========================
  // Clear Filters
  // =========================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("Newest");
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      className={
        darkMode
          ? "app darkMode"
          : "app"
      }
    >
      {/* Navbar */}

      <Navbar />

      <div className="layout">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <main className="content">

          <h2>My DevOps Tasks</h2>

          {/* =========================
              Statistics
          ========================= */}

          <div className="stats">

            <div className="statCard">
              <h3>Total Tasks</h3>
              <p>{totalTasks}</p>
            </div>

            <div className="statCard">
              <h3>Completed</h3>
              <p>{completedTasks}</p>
            </div>

            <div className="statCard">
              <h3>Pending</h3>
              <p>{pendingTasks}</p>
            </div>

            <div className="statCard">
              <h3>High Priority</h3>
              <p>{highPriorityTasks}</p>
            </div>

          </div>

          {/* =========================
              Add Task
          ========================= */}

          <div className="inputBox">

            <input
              type="text"
              placeholder="Enter task title"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Enter task description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="Low">
                Low Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="High">
                High Priority
              </option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

            <button onClick={addTask}>
              Add Task
            </button>

          </div>

          {/* =========================
              Search / Filter / Sort
          ========================= */}

          <div className="filterBox">

            <input
              type="text"
              placeholder="🔎 Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="All">
                All Priority
              </option>

              <option value="Low">
                Low Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="High">
                High Priority
              </option>
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="Newest">
                Newest
              </option>

              <option value="Priority">
                Priority
              </option>

              <option value="Due Date">
                Due Date
              </option>

              <option value="Status">
                Status
              </option>
            </select>

            <button
              className="clearButton"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

          {/* =========================
              Edit Task
          ========================= */}

          {editingIndex !== null && (
            <div className="editBox">

              <h2>Edit Task</h2>

              <input
                type="text"
                placeholder="Task title"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Task description"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
              />

              <select
                value={editPriority}
                onChange={(e) =>
                  setEditPriority(e.target.value)
                }
              >
                <option value="Low">
                  Low Priority
                </option>

                <option value="Medium">
                  Medium Priority
                </option>

                <option value="High">
                  High Priority
                </option>
              </select>

              <input
                type="date"
                value={editDueDate}
                onChange={(e) =>
                  setEditDueDate(e.target.value)
                }
              />

              <button onClick={saveEdit}>
                Save Changes
              </button>

              <button onClick={cancelEdit}>
                Cancel
              </button>

            </div>
          )}

          {/* =========================
              Task List
          ========================= */}

          <div className="taskList">

            {sortedTasks.length === 0 ? (

              <div className="noTasks">

                <h3>No tasks found</h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              sortedTasks.map((item) => {

                const index =
                  tasks.indexOf(item);

                return (
                  <TaskCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    priority={item.priority}
                    dueDate={item.dueDate}
                    status={item.status}
                    onDelete={() =>
                      deleteTask(index)
                    }
                    onToggle={() =>
                      toggleStatus(index)
                    }
                    onEdit={() =>
                      startEdit(index)
                    }
                  />
                );

              })

            )}

          </div>

          {/* =========================
              Settings
          ========================= */}

          <div className="settingsBox">

            <h2>Settings</h2>

            {/* Dark Mode */}

            <div className="settingItem">

              <div>

                <h3>Dark Mode</h3>

                <p>
                  Enable dark mode for the dashboard
                </p>

              </div>

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="settingButton"
              >
                {darkMode ? "ON" : "OFF"}
              </button>

            </div>

            {/* Notifications */}

            <div className="settingItem">

              <div>

                <h3>Notifications</h3>

                <p>
                  Receive task notifications
                </p>

              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className="settingButton"
              >
                {notifications ? "ON" : "OFF"}
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default App;