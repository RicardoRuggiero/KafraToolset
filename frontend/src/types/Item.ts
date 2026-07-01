// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Utilizado pelo frontend para representar uma
// entidade da aplicação.
//
// File: src/types/Item.ts
//
// Purpose: Definir a estrutura de dados utilizada para representar itens.
// ============================================================================

export interface Item {
  id: number;
  name: string;
  description: string | null;
  weight: number | null;
  imageUrl?: string | null;
}
