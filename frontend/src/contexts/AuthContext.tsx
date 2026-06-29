
import { createContext, useContext, useState} from "react";

import type { ReactNode } from "react";

interface AuthUser {
  email: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>( {} as AuthContextType );

interface AuthProviderProps {
  children: ReactNode;
}

function decodeToken(token: string): AuthUser | null {
  try {
    const payloadBase64 =
      token.split(".")[1];

    const payloadJson = atob(payloadBase64);

    const payload = JSON.parse(payloadJson);

    const email = payload.email;

    if (!email) {
      return null;
    }

    const name = email.split("@")[0];

    return {email, name};
  } catch {
    return null;
  }
}

export function AuthProvider({
  children
}: AuthProviderProps) {
  const storedToken =
    localStorage.getItem("token");

  const [token, setToken] =
    useState<string | null>(
      storedToken
    );

  const [user, setUser] =
    useState<AuthUser | null>(
      storedToken
        ? decodeToken(storedToken)
        : null
    );

  const login = ( newToken: string ) => {
    localStorage.setItem(
      "token",
      newToken
    );

    setToken(newToken);

    setUser(decodeToken(newToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}