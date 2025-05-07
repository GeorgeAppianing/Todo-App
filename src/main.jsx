// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

const URL = "https://jsonplaceholder.typicode.com/todos";

createRoot(document.getElementById("root")).render(<App URL={URL} />);
