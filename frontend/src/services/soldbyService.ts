// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Camada responsável pela comunicação entre o frontend e a API REST do
// backend, encapsulando requisições HTTP, tratamento de respostas e
// regras de acesso aos recursos da aplicação.
//
// File: src/services/soldbyService.ts
//
// Purpose: Gerenciar operações relacionadas à associação entre
// Itens e NPCs, incluindo vínculos, consultas e remoções.
// ============================================================================

import api from "./api";
import type { Soldby } from "../types/Soldby";

export const soldbyService = {
  create: async (data: { itemId: number; npcId: number; price: number }) => {
    const response = await api.post("/soldby", data);
    return response.data;
  },

  getByItem: async (itemId: number) => {
    const response = await api.get<Soldby[]>(`/soldby/item/${itemId}`);
    return response.data;
  },

  getByNpc: async (npcId: number) => {
    const response = await api.get<Soldby[]>(`/soldby/npc/${npcId}`);
    return response.data;
  },

  removeByItem: async (itemId: number) => {
    await api.delete(`/soldby/item/${itemId}`);
  },

  removeByNpc: async (npcId: number) => {
    await api.delete(`/soldby/npc/${npcId}`);
  },
};
