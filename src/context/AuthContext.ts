import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    username?: string,
    password?: string,
    remember?: boolean
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});
