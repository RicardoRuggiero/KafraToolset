// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Camada responsável pela comunicação entre o frontend e a API REST do
// backend, encapsulando requisições HTTP, tratamento de respostas e
// regras de acesso aos recursos da aplicação.
//
// File: src/services/authService.ts
//
// Purpose: Executar operações de autenticação e gerenciamento de
// usuários, incluindo login, registro e obtenção de tokens de acesso.
// ============================================================================

import api from "./api";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/Auth";

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
};
