
import api from "./api";
import type { Item } from "../types/Item";

export const itemService = {
  getAll: async () => {
    const response = await api.get<Item[]>("/items");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  },

  create: async (item: FormData) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/items",
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
},
};