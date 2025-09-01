import type { FieldValues } from "react-hook-form";

export const ConsoleColors = {
  GET: "#6BDD9A",
  HEAD: "#79E0A4",
  POST: "#FFE47E",
  PUT: "#74AEF6",
  PATCH: "#C0A8E1",
  DELETE: "#F79A8E",
  OPTIONS: "#F15EB0",
  URL: "#F09B51",
} as const;

export type ConsoleColors = typeof ConsoleColors;

export interface FormLoginValues extends FieldValues {
  name: string;
  password: string;
  remember: boolean;
}

export interface MenuItem {
  pageTitle: string;
  text: string;
  icon?: string;
  url?: string;
  class?: string;
}

export const LoadingState = {
  Loading: "loading",
  Success: "success",
  Error: "error",
} as const;

export type LoadingState = (typeof LoadingState)[keyof typeof LoadingState];

export interface GetRuleByIdPayload {
  id: number;
}

export interface DeleteRuleByIdPayload {
  id: number;
}
