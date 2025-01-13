import React from "react";
import ReactDOM from "react-dom/client";
//rrd
import { BrowserRouter } from "react-router-dom";
//App
import App from "./App";
//Tailwind Setup
import "./index.css";
//context
import { UserProvider } from "./context/userContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || ""}>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
