export interface RegisterRequest {
  email: string;
  senha: string;
  secret: string;
}
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}
