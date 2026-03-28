import { useState } from "react";
import TodoItem from "./TodoItem";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete Lab 4", completed: false, priority: "high" }
  ]);
  const [newText, setNewText] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  // CRUD Functions
  const addTodo = () => {
    if (!newText.trim()) return;
    const newTodo = { id: Date.now(), text: newText, completed: false, priority: newPriority };
    setTodos([newTodo, ...todos]);
    setNewText("");
  };

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  
  const toggleTodo = (id) => setTodos(todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  ));

  const editTodo = (id, text) => setTodos(todos.map(t => 
    t.id === id ? { ...t, text } : t
  ));

  // Logic for Filtering
  const filteredTodos = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="bg">
      <div className="left">
        <div className="info">
          <h1>Todo Pro</h1>
          <p>{todos.filter(t => !t.completed).length} tasks remaining</p>
        </div>
      </div>

      <div className="right">
        <div className="form-container">
          <div className="add-bar">
            <input 
              className="input" 
              value={newText} 
              onChange={e => setNewText(e.target.value)} 
              placeholder="What's next?"
            />
            <select className="select" onChange={e => setNewPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className="btn" onClick={addTodo}>Add</button>
          </div>

          <div className="filter-tabs">
            {['all', 'active', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
                {f}
              </button>
            ))}
          </div>

          <div className="list">
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}