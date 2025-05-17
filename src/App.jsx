import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { Data } from "./Data";
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
  const [formModal, setFormModal] = useState(false);
  const [addFormModal, setAddFormModal] = useState(false);
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
  function handleUpdate(todo) {
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
        setEditId(null);
      });
  }
  // function for populating form fields with existing Tasks
  function handleEditInput(todo) {
    setFormModal(true);
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
    <div className=" p-10 flex flex-col mx-auto w-4/5 ">
      <h1 className="text-2xl font-bold px-10">📝 Task App</h1>
      {!addFormModal && (
        <Form
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      )}

      {/*  Task Card */}
      <div>
        {!loading ? (
          <Data
            todos={todos}
            handleDelete={handleDelete}
            handleEditInput={handleEditInput}
            categoryColors={categoryColors}
          />
        ) : (
          <h2>Loading....</h2>
        )}
      </div>
      <Modal />
    </div>
  );

  function Modal() {
    return (
      <div>
        {formModal && (
          <FormModal
            setFormData={setFormData}
            formData={formData}
            handleUpdate={handleUpdate}
            setFormModal={setFormModal}
            formModal={formModal}
          />
        )}
      </div>
    );
  }
}

export default App;
