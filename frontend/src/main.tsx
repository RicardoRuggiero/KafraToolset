
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/frutiger.css";

import { AuthProvider } from "./contexts/AuthContext";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);