import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    username?: string,
    password?: string,
    remember?: boolean
  ) => Promise<void>;
  logout: (remember?: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultThemeContext: ThemeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export type { ThemeContextType };
