
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
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/npcs",
      npc,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  update: async (id: number, npc: Npc) => {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `/npcs/${id}`,
      npc,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  delete: async (id: number) => {
    const token = localStorage.getItem("token");
    await api.delete(
      `/npcs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};