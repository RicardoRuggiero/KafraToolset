// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Utilizado pelo frontend para representar uma
// entidade da aplicação.
//
// File: src/types/Auth.ts
//
// Purpose: Definir a estrutura de dados relacionada à autenticação e login.
// ============================================================================

export interface RegisterRequest {
  email: string;
  senha: string;
  secret: string;
}
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}
