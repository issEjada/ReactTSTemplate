import React, { useState, useEffect, useMemo, type ReactNode } from "react";
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

  const login = (
    username?: string,
    password?: string,
    remember?: boolean
  ): Promise<void> => {
    if (!(username && password && remember !== undefined)) {
      return Promise.reject(new Error("Missing login parameters"));
    }

    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("username", username);
    data.append("password", password);
    data.append(
      "scope",
      "sdk_backoffice fpt_backoffice scoring_rules_management alphas_backoffice"
    );

    return httpClient
      .post(
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
      )
      .then((response) => {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(ConstantKeys.accessToken, response.data.access_token);
        storage.setItem(ConstantKeys.rememberMe, String(remember));
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.error("Login failed:", error);
        throw new Error(error.response?.data.error_description);
      });
  };

  const logout = (): Promise<void> => {
    const accessToken =
      sessionStorage.getItem(ConstantKeys.accessToken) ||
      localStorage.getItem(ConstantKeys.accessToken);

    if (!accessToken) {
      setIsAuthenticated(false);
      return Promise.resolve();
    }

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
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
