import React, { useState, useEffect } from "react";
import axios from "axios";

function App({ URL }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

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
    if (!task || !status || !priority || !notes || !category) return;
    setLoading(true);
    const updatedData = {
      // id: todos.length + 1,
      task,
      status,
      priority,
      notes,
      category,
    };
    axios
      .post(URL, updatedData)
      .then((response) => {
        setTodos([response.data, ...todos]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error message", error);
      })
      .finally(() => {
        setLoading(false);
        setTask("");
        setStatus("");
        setPriority("");
        setNotes("");
        setCategory("");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">This is a Todo App </h1>
      <p>{todos.length}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Enter Title of Task:</label>
        <input
          type="text"
          className="ring-1 p-2 w-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ring-1 p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="ring-1 p-2 w-full"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-40 w-full ring-1 p-2 resize-none"
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ring-1 p-2 w-full"
        >
          <option value="health">Health</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="tech">Tech</option>
          <option value="career">Career</option>
          <option value="family">Family</option>
          <option value="hobby">Hobby</option>
          <option value="leisure">Leisure</option>
          <option value="travel">Travel</option>
          <option value="finance">Finance</option>
        </select>

        <button
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>

      {!loading ? (
        sortedList.map((todo) => (
          <div key={todo.id}>
            <h2>Todo: {todo.task}</h2>
            <h2>status: {todo.status}</h2>
            <button
              // onClick={() => handleDelete(todo.id)}
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
