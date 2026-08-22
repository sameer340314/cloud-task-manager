function TaskCard({ title, status, onDelete, onToggle }) {
  return (
    <div className="card">
      <h3>{title}</h3>

      <p>
        Status:
        <span
          style={{
            color: status === "Completed" ? "green" : "orange",
            fontWeight: "bold",
            marginLeft: "5px",
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
        Complete
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