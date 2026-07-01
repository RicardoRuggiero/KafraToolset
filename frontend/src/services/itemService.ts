// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Camada responsável pela comunicação entre o frontend e a API REST do
// backend, encapsulando requisições HTTP, tratamento de respostas e
// regras de acesso aos recursos da aplicação.
//
// File: src/services/itemService.ts
//
// Purpose: Executar operações CRUD e comunicação com os endpoints
// da entidade Item da API.
// ============================================================================

import api from "./api";
import type { Item } from "../types/Item";

export const itemService = {
  getAll: async () => {
    const response = await api.get<Item[]>("/items");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  update: async (id: number, item: FormData) => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  },

  create: async (item: FormData) => {
    const response = await api.post("/items", item);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/items/${id}`);
  },
};
