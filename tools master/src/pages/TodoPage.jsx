import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useState, useEffect } from "react";
import "../styles/todo.css";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");

  const addTodo = (text) => {
    if (text.trim() === "") return;
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <TodoForm addTodo={addTodo} />
      <div className="filters">
        <button onClick={() => setFilter("all")}> All </button>
        <button onClick={() => setFilter("active")}> Active </button>
        <button onClick={() => setFilter("completed")}> Completed </button>
      </div>
      {todos.length === 0 && <p className="empty">No tasks yet 👀</p>}
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
}

export default TodoPage;
