import { useState } from "react";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default behaviour --> let react handle it
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          placeholder="Enter Task"
          onChange={(e) => setText(e.target.value)}
        />
        <button> Add </button>
      </form>
    </div>
  );
}

export default TodoForm;
