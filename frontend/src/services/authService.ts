
import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/Auth";

export const authService = {

  register: async (data: RegisterRequest) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
},

  login: async (data: LoginRequest) => {
    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        data
      );

    return response.data;
  },
};