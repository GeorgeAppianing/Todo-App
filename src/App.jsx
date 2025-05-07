import React, { useState, useEffect } from "react";

function App({ URL }) {
  const [todos, setTodos] = useState([]);

  const sortedList = todos.splice(0, 10);

  function fetchTodos() {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log("Error fetching todos:", err);
      });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">This is a Todo App </h1>
      {sortedList.map((todo) => (
        <div key={todo.id}>
          <h2>Todo: {todo.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
