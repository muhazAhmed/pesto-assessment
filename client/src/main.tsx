import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontWeight: "bold",
        },
        success: {
          style: {
            color: "green",
          },
        },
        error: {
          style: {
            color: "red",
          },
        },
      }}
    />
  </React.StrictMode>
);
