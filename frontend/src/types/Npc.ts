// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Utilizado pelo frontend para representar uma
// entidade da aplicação.
//
// File: src/types/Npc.ts
//
// Purpose: Definir a estrutura de dados utilizada para representar NPCs.
// ============================================================================

export interface Npc {
  id: number;
  name: string | null;
  mapname: string;
  x: number;
  y: number;
  job: number;
  type: string;
}
