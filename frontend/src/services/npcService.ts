// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Camada responsável pela comunicação entre o frontend e a API REST do
// backend, encapsulando requisições HTTP, tratamento de respostas e
// regras de acesso aos recursos da aplicação.
//
// File: src/services/npcService.ts
//
// Purpose: Executar operações CRUD e comunicação com
// os endpoints da entidade NPC da API.
// ============================================================================

import api from "./api";
import type { Npc } from "../types/Npc";

export const npcService = {
  getAll: async () => {
    const response = await api.get<Npc[]>("/npcs");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Npc>(`/npcs/${id}`);
    return response.data;
  },

  create: async (npc: Npc) => {
    const response = await api.post("/npcs", npc);
    return response.data;
  },

  update: async (id: number, npc: Npc) => {
    const response = await api.put(`/npcs/${id}`, npc);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/npcs/${id}`);
  },
};
