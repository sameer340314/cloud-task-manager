function TaskCard({
  title,
  description,
  priority,
  dueDate,
  status,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className="card">

      <h3>{title}</h3>

      <p>{description}</p>

      <p>
        Priority:{" "}
        <span
          style={{
            fontWeight: "bold",
            color:
              priority === "High"
                ? "red"
                : priority === "Medium"
                ? "orange"
                : "green",
          }}
        >
          {priority}
        </span>
      </p>

      {dueDate && (
        <p>
          Due Date: <strong>{dueDate}</strong>
        </p>
      )}

      <p>
        Status:{" "}
        <span
          style={{
            color:
              status === "Completed"
                ? "green"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      </p>

      <button
        onClick={onToggle}
        style={{
          background: "green",
          color: "white",
          marginRight: "8px",
        }}
      >
        {status === "Pending"
          ? "Complete"
          : "Undo"}
      </button>

      <button
        onClick={onEdit}
        style={{
          background: "#2563eb",
          color: "white",
          marginRight: "8px",
        }}
      >
        Edit
      </button>

      <button
        onClick={onDelete}
        style={{
          background: "red",
          color: "white",
        }}
      >
        Delete
      </button>

    </div>
  );
}

export default TaskCard;