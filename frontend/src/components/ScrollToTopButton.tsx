// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/ScrollToTopButton.tsx
//
// Purpose: Permitir retorno suave ao topo da página através de
// um botão flutuante contextual.
// ============================================================================

import { useEffect, useState } from "react";

import "../style/scroll-to-top.css";

function ScrollToTopButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setEnabled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (!enabled) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={enabled ? "scroll-top-button enabled" : "scroll-top-button disabled"} onClick={handleClick}>
      ↑
    </button>
  );
}

export default ScrollToTopButton;
