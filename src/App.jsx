import React, { useState, useEffect } from "react";
import axios from "axios";

function App({ URL }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [completed, setCompleted] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  const sortedList = todos.slice(0, 100);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">This is a Todo App </h1>
      <p>{todos.length}</p>
      <form>
        <label>Enter Title of Task: </label>
        <input
          type="text"
          className="ring-1"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <label>Status</label>
        <select name="" id="">
          <option value="pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Priority</label>
        <select name="" id="">
          <option value="pending">High</option>
          <option value="Completed">Medium</option>
        </select>

        <label htmlFor="">Notes</label>
        <input type="text" />

        <label>Category</label>
        <select name="" id="">
          <option value="pending">Health</option>
          <option value="Completed">Personal</option>
          <option value="Completed">Work</option>
          <option value="Completed">Study</option>
          <option value="Completed">Tech</option>
          <option value="Completed">Career</option>
          <option value="Completed">Family</option>
          <option value="Completed">Hobby</option>
          <option value="Completed">Leisure</option>
          <option value="Completed">Travel</option>
          <option value="Completed">Finance</option>
        </select>

        <button className="bg-blue-400 text-black" type="submit">
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
