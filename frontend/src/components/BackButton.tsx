// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/BackButton.tsx
//
// Purpose: Permitir retorno à página anteriormente visitada
// através do histórico de navegação do navegador.
// ============================================================================

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../style/back-button.css";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.history.length > 1);
  }, [location.pathname]);

  const handleClick = () => {
    if (!enabled) {
      return;
    }

    navigate(-1);
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <button className={enabled ? "back-button enabled" : "back-button disabled"} onClick={handleClick}>
      ←
    </button>
  );
}

export default BackButton;
