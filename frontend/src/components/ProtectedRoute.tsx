// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/ProtectedRoute.tsx
//
// Purpose: Restringir acesso a rotas protegidas da aplicação, 
// permitindo navegação apenas para usuários autenticados.
// ============================================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("Você precisa estar logado para acessar esta página.");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
