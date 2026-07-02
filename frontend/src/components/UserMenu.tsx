// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/UserMenu.tsx
//
// Purpose: Exibir informações do usuário autenticado e
// disponibilizar ações relacionadas à sessão atual.
// ============================================================================

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../style/user-menu.css";

function UserMenu() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();

    alert("Logout realizado com sucesso.");
  };

  return (
    <div className="user-menu-container">
      <button className="user-menu-button" onClick={() => setOpen(!open)}>
        <div className="user-avatar">{firstLetter}</div>

        <div className="user-info">
          <div className="user-name">{user.name}</div>

          <div className="user-email">{user.email}</div>
        </div>
      </button>

      {open && (
        <div className="user-dropdown">
          <button className="user-dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
