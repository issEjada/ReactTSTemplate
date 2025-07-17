import React, { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./Context";
import { httpClient } from "../services/api/httpClient";
import { ConstantKeys } from "../constants/ConstantKeys.constants";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token =
      sessionStorage.getItem(ConstantKeys.accessToken) ||
      localStorage.getItem(ConstantKeys.accessToken);
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (
    username?: string,
    password?: string,
    remember?: boolean
  ) => {
    if (username && password && remember !== undefined) {
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", username);
      data.append("password", password);
      data.append(
        "scope",
        "sdk_backoffice fpt_backoffice scoring_rules_management alphas_backoffice"
      );

      try {
        const response = await httpClient.post(
          `${
            import.meta.env.VITE_API_LOGIN_URL
          }/realms/master/protocol/openid-connect/token`,
          data,
          {
            auth: {
              username: import.meta.env.VITE_AUTH_USERNAME ?? "",
              password: import.meta.env.VITE_AUTH_PASSWORD ?? "",
            },
          }
        );

        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(ConstantKeys.accessToken, response.data.access_token);
        storage.setItem(ConstantKeys.rememberMe, String(remember));
        setIsAuthenticated(true);
      } catch (error: any) {
        setIsAuthenticated(false);
        console.error("Login failed:", error);
        throw new Error(error.response?.data.error_description);
      }
    }
  };

  const logout = () => {
    const accessToken =
      sessionStorage.getItem(ConstantKeys.accessToken) ||
      localStorage.getItem(ConstantKeys.accessToken);

    if (accessToken) {
      const data = new URLSearchParams();
      data.append("token", accessToken);
      data.append("token_type_hint", "access_token");

      return httpClient
        .post(
          `${
            import.meta.env.VITE_API_LOGOUT_URL
          }/realms/master/protocol/openid-connect/revoke`,
          data,
          {
            auth: {
              username: import.meta.env.VITE_AUTH_USERNAME ?? "",
              password: import.meta.env.VITE_AUTH_PASSWORD ?? "",
            },
          }
        )
        .then(() => {
          // Clear both just in case
          sessionStorage.removeItem(ConstantKeys.accessToken);
          localStorage.removeItem(ConstantKeys.accessToken);
          sessionStorage.removeItem(ConstantKeys.rememberMe);
          localStorage.removeItem(ConstantKeys.rememberMe);
          setIsAuthenticated(false);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          console.error("Logout failed:", error);
          throw new Error(error.response?.data.error_description);
        });
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
