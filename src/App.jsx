import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";

function createTaskId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(
        "cloudTaskManagerTasks"
      );

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          return parsedTasks.map((item) => ({
            id: item.id || createTaskId(),
            title: item.title || "",
            description: item.description || "",
            priority: item.priority || "Medium",
            dueDate: item.dueDate || "",
            status: item.status || "Pending",
          }));
        }
      }
    } catch (error) {
      console.error(
        "Error loading tasks from LocalStorage:",
        error
      );
    }

    return [
      {
        id: createTaskId(),
        title: "React Dashboard",
        description: "Complete the frontend dashboard",
        priority: "High",
        dueDate: "2026-09-05",
        status: "Completed",
      },
      {
        id: createTaskId(),
        title: "Docker Setup",
        description: "Build and test Docker container",
        priority: "Medium",
        dueDate: "2026-09-06",
        status: "Pending",
      },
    ];
  });

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

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: createTaskId(),
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

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (item) => item.id !== id
      )
    );

    if (editingId === id) {
      cancelEdit();
    }
  };

  const toggleStatus = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
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

  const startEdit = (id) => {
    const item = tasks.find(
      (taskItem) => taskItem.id === id
    );

    if (!item) {
      return;
    }

    setEditingId(id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditPriority(item.priority);
    setEditDueDate(item.dueDate || "");
  };

  const saveEdit = () => {
    if (editingId === null) {
      return;
    }

    if (editTitle.trim() === "") {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === editingId
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

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("Medium");
    setEditDueDate("");
  };

  const filteredTasks = tasks.filter((item) => {
    const searchText = search
      .toLowerCase()
      .trim();

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(searchText) ||
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

        return a.dueDate.localeCompare(
          b.dueDate
        );
      }

      if (sortBy === "Status") {
        return a.status.localeCompare(
          b.status
        );
      }

      return 0;
    }
  );

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("Newest");
  };

  return (
    <div
      className={
        darkMode
          ? "app darkMode"
          : "app"
      }
    >
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h2>My DevOps Tasks</h2>

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

          {editingId !== null && (
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

          <div className="taskList">

            {sortedTasks.length === 0 ? (

              <div className="noTasks">

                <h3>No tasks found</h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              sortedTasks.map((item) => (

                <TaskCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  dueDate={item.dueDate}
                  status={item.status}
                  onDelete={() =>
                    deleteTask(item.id)
                  }
                  onToggle={() =>
                    toggleStatus(item.id)
                  }
                  onEdit={() =>
                    startEdit(item.id)
                  }
                />

              ))

            )}

          </div>

          <div className="settingsBox">

            <h2>Settings</h2>

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