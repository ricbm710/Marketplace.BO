import React from "react";
import ReactDOM from "react-dom/client";
//rrd
import { BrowserRouter } from "react-router-dom";
//App
import App from "./App";
//Tailwind Setup
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || ""}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
