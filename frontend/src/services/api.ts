// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Camada responsável pela comunicação entre o frontend e a API REST do
// backend, encapsulando requisições HTTP, tratamento de respostas e
// regras de acesso aos recursos da aplicação.
//
// File: src/services/api.ts
//
// Purpose: Configurar e centralizar a instância Axios da aplicação,
// incluindo URL base, interceptadores e
// gerenciamento automático de autenticação JWT.
// ============================================================================

import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
