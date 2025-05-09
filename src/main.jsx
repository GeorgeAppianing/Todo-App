// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

const URL = "http://localhost:8000/todo";

createRoot(document.getElementById("root")).render(<App URL={URL} />);
