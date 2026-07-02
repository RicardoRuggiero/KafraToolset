// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/ValidatedInput.tsx
//
// Purpose: Fornecer um campo reutilizável com validação visual em
// tempo real para formulários da aplicação.
// ============================================================================

import { useState } from "react";
import "../style/validated-input.css";

interface ValidatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
  type?: string;
  textarea?: boolean;
}

function ValidatedInput({ label, value, onChange, errorMessage, type = "text", textarea = false }: ValidatedInputProps) {
  const [focused, setFocused] = useState(false);

  const isEmpty = value.trim() === "";

  const showError = focused && isEmpty;

  const showSuccess = focused && !isEmpty;

  const inputClassName = `form-control frutiger-input ${showError ? "validated-input-error" : showSuccess ? "validated-input-success" : ""}`;

  return (
    <div className="mb-3">
      <label className="form-label frutiger-label">{label}</label>

      {textarea ? (
        <textarea
          className={inputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}

      {showError && <div className="validated-input-message">{errorMessage}</div>}
    </div>
  );
}

export default ValidatedInput;
