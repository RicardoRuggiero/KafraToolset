// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/HomeButton.tsx
//
// Purpose: Fornecer navegação rápida e consistente para
// a página inicial da aplicação.
// ============================================================================

import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link to="/" className="btn frutiger-btn mb-3">
      🏠 Início 🍑
    </Link>
  );
}

export default HomeButton;
