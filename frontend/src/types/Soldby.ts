// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Utilizado pelo frontend para representar uma
// entidade da aplicação.
//
// File: src/types/Soldby.ts
//
// Purpose: Definir a estrutura de dados utilizada para
// representar relações entre NPCs e itens vendidos.
// ============================================================================

import type { Item } from "./Item";
import type { Npc } from "./Npc";

export interface Soldby {
  id: number;
  price: number;
  item: Item;
  npc: Npc;
}
