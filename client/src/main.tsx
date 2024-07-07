import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "./utils/SettingsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
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
