
import api from "./api";
import type { Item } from "../types/Item";

export const itemService = {
  getAll: async () => {
    const response = await api.get<Item[]>("/items");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(
      `/items/${id}`
    );

    return response.data;
  },

  update: async (
    id: number,
    item: FormData
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.put(
        `/items/${id}`,
        item,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  },

  create: async (
    item: FormData
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/items",
        item,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },

  delete: async (
    id: number
  ) => {
    const token =
      localStorage.getItem("token");

    await api.delete(
      `/items/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
  },
};