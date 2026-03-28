import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  }

  // Styles are applied based on priority (High/Med/Low)
  const priorityStyle = {
    high: { bg: "rgba(252,92,125,0.15)", color: "#fc5c7d" },
    medium: { bg: "rgba(255,183,0,0.15)", color: "#ffb700" },
    low: { bg: "rgba(46,125,50,0.15)", color: "#81c784" }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input 
          className="edit-input"
          value={editText} 
          onChange={e => setEditText(e.target.value)} 
          onKeyDown={e => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}

      <span className="badge" style={{ 
        background: priorityStyle[todo.priority].bg, 
        color: priorityStyle[todo.priority].color 
      }}>
        {todo.priority}
      </span>

      <div className="actions">
        <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;