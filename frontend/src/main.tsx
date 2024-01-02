import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContextProvider } from "./context/AuthContext.js";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <App />
        <ToastContainer />
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
