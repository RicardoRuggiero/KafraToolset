
import api from "./api";
import type { Soldby } from "../types/Soldby";

export const soldbyService = {
  create: async (data: {
    itemId: number;
    npcId: number;
    price: number;
  }) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/soldby",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  getByItem: async (itemId: number) => {
    const token = localStorage.getItem("token");

    const response = await api.get<Soldby[]>(
      `/soldby/item/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  getByNpc: async (npcId: number) => {
    const token = localStorage.getItem("token");

    const response = await api.get<Soldby[]>(
      `/soldby/npc/${npcId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  removeByItem: async (itemId: number) => {
    const token = localStorage.getItem("token");

    await api.delete(
      `/soldby/item/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  removeByNpc: async (npcId: number) => {
    const token = localStorage.getItem("token");

    await api.delete(
      `/soldby/npc/${npcId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};