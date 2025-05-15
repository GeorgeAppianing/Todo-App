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
  const [editTodo, setEditTodo] = useState(null);

  // const sortedList = todos.slice(0, 10);

  function fetchData() {
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error message", error);
        // setLoading(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!task || !status || !priority || !notes || !category)
      return alert("Enter fields");
    setLoading(true);
    const updatedData = {
      // id: todos.length + 1, this is not needed as the server will generate an id
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
    console.log("submitted");
  }

  function handleDelete(id) {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newTodo = todos.filter((todo) => todo.id !== id);
        setTodos(newTodo);
      })
      .catch((error) => {
        console.log(("Error message", error));
      });
  }

  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTask(todoToEdit.task);
    setStatus(todoToEdit.status);
    setPriority(todoToEdit.priority);
    setNotes(todoToEdit.notes);
    setCategory(todoToEdit.category);
    setEditTodo(id);

    // setLoading(true);
    const updatedData = {
      task,
      status,
      priority,
      notes,
      category,
    };
    axios
      .put(`${URL}/${id}`, updatedData)
      .then((response) => {
        const newTodo = todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        );
        setTodos(newTodo);
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

    // console.log("submitted");

    // setLoading(false);
    // setTask("");
    // setStatus("");
    // setPriority("");
    // setNotes("");
    // setCategory("");

    // setEditTodo(null);

    // setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-h-screen p-10 flex flex-col mx-auto w-3/4">
      {/* <p>{todos.length}</p> */}
      <form onSubmit={handleSubmit} className="">
        <h1 className="text-2xl font-bold">📝 Task App </h1>
        <div>
          <label>Task</label>
          <input
            type="text"
            className="ring-1 p-2 w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Eg.Finish React project"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ring-1 p-2 w-full"
          >
            <option value="">--Select Status--</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="ring-1 p-2 w-full"
          >
            <option value="">--Select Priority--</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-20 w-full ring-1 p-2 resize-none"
            placeholder="Details about your task"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="ring-1 p-2 w-full"
          >
            <option value="">Select Category</option>
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
        </div>

        <button
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded "
          type="submit"
        >
          Submit
        </button>
      </form>

      {!loading ? (
        todos.map((todo) => (
          <div key={todo.id} className="border">
            <h2>Title: {todo.task}</h2>
            <h2>status: {todo.status}</h2>
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
