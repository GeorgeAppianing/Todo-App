import React, { useState, useEffect } from "react";
import axios from "axios";

function App({ URL }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const sortedList = todos.slice(0, 10);

  function fetchData() {
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error message", error);
        // setLoading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) {
      return;
    }
    axios
      .post(URL, { title: input, completed: false, id: todos.length + 1 })
      .then(() => {
        setTodos([...todos]);
      });
  }

  function handleDelete(id) {
    axios.delete(`${URL}/${id}`).then(() => {
      const updatedTodo = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodo);
    });
  }

  function handleEdit(id) {
    axios
      .put(`${URL}/${id}`, { completed: true, input, id })
      .then((response) => {
        const updatedTodo = todos.map((todo) =>
          todo.id === id ? response.data : todo
        );
        setTodos(updatedTodo);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">This is a Todo App </h1>
      <p>{todos.length}</p>
      <form onSubmit={handleSubmit}>
        <label>Enter Todo: </label>
        <input
          type="text"
          className="ring-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-400 text-black" type="submit">
          Submit
        </button>
      </form>
      {!loading ? (
        sortedList.map((todo) => (
          <div key={todo.id}>
            <h2>Todo: {todo.task}</h2>
            <h2>status: {todo.notes}</h2>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-300"
            >
              Delete
            </button>
            <button
              // onClick={() => handleEdit(todo.id)}
              className="bg-yellow-300"
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default App;
