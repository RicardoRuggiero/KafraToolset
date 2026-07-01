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
