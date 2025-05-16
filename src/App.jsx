import React, { useState, useEffect } from "react";
import axios from "axios";

function App({ URL }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    status: "",
    priority: "",
    notes: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  // Function for fetching Data
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
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // Function for Handling submission to Database
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.task ||
      !formData.status ||
      !formData.priority ||
      !formData.notes ||
      !formData.category
    )
      return alert("Enter fields");
    setLoading(true);

    axios
      .post(URL, formData)
      .then((response) => {
        setTodos([response.data, ...todos]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error message", error);
      })
      .finally(() => {
        setLoading(false);
        setFormData({
          task: "",
          status: "",
          priority: "",
          notes: "",
          category: "",
        });
      });
    console.log("submitted");
  }
  // Finction for Handling Delete
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

  // function for handing update/Edit of Task
  function handleEdit(todo) {
    setFormData({
      task: todo.task,
      status: todo.status,
      priority: todo.priority,
      notes: todo.notes,
      category: todo.category,
    });
    setEditId(todo.id);

    axios
      .put(`${URL}/${editId}`, formData)
      .then((response) => {
        const newTodo = todos.map((todo) =>
          todo.id === editId ? { ...todo, ...response.data } : todo
        );
        setTodos(newTodo);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error message", error);
      })
      .finally(() => {
        setLoading(false);
        setFormData({
          task: "",
          status: "",
          priority: "",
          notes: "",
          category: "",
        });
        setEditId(null);
      });
  }
  // function for populating form fields with existing Tasks
  function handleEditClick(todo) {
    setFormData({
      task: todo.task,
      status: todo.status,
      priority: todo.priority,
      notes: todo.notes,
      category: todo.category,
    });
    setEditId(todo.id);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const categoryColors = {
    work: "bg-blue-100 text-blue-700",
    personal: "bg-green-100 text-green-700",
    home: "bg-gray-100 text-gray-700",
    finance: "bg-yellow-100 text-yellow-700",
    tech: "bg-purple-100 text-purple-700",
    health: "bg-red-100 text-red-700",
    career: "bg-orange-100 text-orange-700",
    family: "bg-pink-100 text-pink-700",
    study: "bg-indigo-100 text-indigo-700",
    hobby: "bg-teal-100 text-teal-700",
    travel: "bg-cyan-100 text-cyan-700",
    leisure: "bg-lime-100 text-lime-700",
  };

  return (
    <div className=" p-10 flex flex-col mx-auto w-4/5">
      <h1 className="text-2xl font-bold">📝 Task App</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-10">
        <div>
          <label>Task</label>
          <input
            type="text"
            className="ring-1 ring-gray-400 p-2 flex rounded w-full"
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            placeholder="Eg.Finish React project"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="ring-1 ring-gray-400 p-2 flex rounded w-full"
          >
            <option value="">--Select Status--</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="ring-1 ring-gray-400 p-2 flex rounded w-full"
          >
            <option value="">--Select Priority--</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="ring-1 ring-gray-400 p-2 flex rounded w-full"
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

        <label>Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="h-20 w-full ring-1 p-2 resize-none ring-gray-400 rounded col-span-full"
          placeholder="Details about your task"
        />

        <button
          className="bg-blue-700 hover:bg-blue-500 text-white px-2 py-1 rounded "
          type="submit"
        >
          Add Task
        </button>
      </form>

      {/*  Task Card */}
      <div className=" grid grid-cols-4 mx-auto gap-4">
        {!loading ? (
          todos.map((todo) => (
            <div key={todo.id} className="bg-white shadow-sm rounded p-4 ">
              <h2 className="font-bold text-sm my-1">{todo.task}</h2>
              <p className="text-xs my-1">status: {todo.status}</p>
              <p className="text-xs my-1">Priority: {todo.priority}</p>
              <p className="text-xs my-4">{todo.notes}</p>

              <div className="flex justify-between mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    categoryColors[todo.category]
                  }`}
                >
                  {todo.category}
                </span>

                <div className="flex gap-x-2">
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 text-xs"
                  >
                    Delete
                  </button>

                  <button
                    // onClick={() => handleEdit(todo.id)}
                    className="bg-yellow-300 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>Loading....</h2>
        )}
      </div>
    </div>
  );
}

export default App;
