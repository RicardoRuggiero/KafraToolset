// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Componente reutilizável da interface responsável por encapsular
// comportamentos e elementos visuais da aplicação, promovendo 
// reutilização, organização e padronização do frontend.
//
// File: src/components/LoginValidatedInput.tsx
//
// Purpose: Centralizar validações visuais e comportamentais
// utilizadas nos campos de autenticação.
// ============================================================================

import "../style/validated-input.css";

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  errorMessage: string;
}

function LoginValidatedInput({ label, type, value, onChange, isValid, isInvalid, errorMessage }: Props) {
  return (
    <div className="mb-3">
      <label className="form-label frutiger-label">{label}</label>

      <input
        type={type}
        className={
          isInvalid
            ? "form-control frutiger-input validated-input-error"
            : isValid
              ? "form-control frutiger-input validated-input-success"
              : "form-control frutiger-input"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {isInvalid && <div className="validated-input-message">{errorMessage}</div>}
    </div>
  );
}

export default LoginValidatedInput;
