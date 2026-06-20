
import api from "./api";

export const soldbyService = {
  create: async (data: {
    itemId: number;
    npcId: number;
    price: number;
  }) => {
    const response = await api.post("/soldby", data);
    return response.data;
  },
};