import axios from "axios";
import SecureStorage from "react-secure-storage";
import { ConsoleColors } from "../../types/types";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ConstantKeys } from "../../constants/ConstantKeys.constants";

interface ServerErrorResponseErrors {
  message?: string[];
}
export interface ServerErrorResponse {
  error?: string;
  errors?: string | ServerErrorResponseErrors;
  message?: string;
}
export interface ServerError extends AxiosError<ServerErrorResponse> {
  date?: Date;
  status?: number;
  data?: ServerErrorResponse;
  errorMessage?: string;
}

const getLogMessage = (message: string) => `## HttpClient:: ${message}`;

const addHeaders = (config: InternalAxiosRequestConfig) => {
  config.headers.Accept = "application/json";
  const token = SecureStorage.getItem(ConstantKeys.accessToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
};

const getLogMethodColor = (method?: string) => {
  let methodColor: string | undefined;

  switch (method) {
    case "GET":
      methodColor = ConsoleColors.GET;
      break;
    case "HEAD":
      methodColor = ConsoleColors.HEAD;
      break;

    case "POST":
      methodColor = ConsoleColors.POST;
      break;

    case "PUT":
      methodColor = ConsoleColors.PUT;
      break;

    case "PATCH":
      methodColor = ConsoleColors.PATCH;
      break;

    case "DELETE":
      methodColor = ConsoleColors.DELETE;
      break;

    case "OPTIONS":
      methodColor = ConsoleColors.OPTIONS;
      break;

    default:
      methodColor = undefined;
      break;
  }

  return methodColor;
};

const handle401Error = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage("handle401Error"), error);
  const status = error.response?.status;
  console.info(getLogMessage("status"), status);

  if (status === 401 || status === 403) {
    SecureStorage.removeItem(ConstantKeys.accessToken);
    setTimeout(() => {
      window.location.assign("/login"); // Use assign for better compatibility
    }, 0);
  }
};

const getErrorMessage = (error: AxiosError<ServerErrorResponse>) => {
  // TODO: Construct error message base on "ServerErrorResponse" constructed from API.
  let errorMessage: string = "Unknown Error";

  if (error.response?.data?.error) {
    errorMessage = error.response?.data?.error;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === "string"
  ) {
    errorMessage = error.response?.data?.errors;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === "object" &&
    error.response?.data?.errors?.message?.length
  ) {
    errorMessage = error.response?.data?.errors?.message?.join("\n");
  } else if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
};

const handleAxiosError = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage("handleAxiosError"), "... ", error);

  console.log("errorData", error);

  if (error && !(error.response?.data?.error ?? "").includes("invalid_grant")) {
    console.log("test");
    handle401Error(error);
  }

  const severError: ServerError = {
    ...error,
    date: new Date(),
    status: error.response?.status,
    data: error.response?.data,
    errorMessage: getErrorMessage(error),
  };

  return Promise.reject(severError);
};

const requestFulfilledInterceptor = (config: InternalAxiosRequestConfig) => {
  addHeaders(config);
  const method = config.method?.toUpperCase();
  const methodColor = getLogMethodColor(method);

  console.info(
    getLogMessage(`🚀 Sending %c${method}%c Request to %c${config.url}`),
    `color: ${methodColor}`,
    "color: undefined",
    `color: ${ConsoleColors.URL}`,
    config
  );

  return config;
};

const requestRejectedInterceptor = (error: AxiosError<ServerErrorResponse>) => {
  console.error(
    getLogMessage(
      `🚫 Error Sending Request to %c${error.response?.config?.url}`
    ),
    `color: ${ConsoleColors.URL}`,
    error
  );

  return Promise.reject(error);
};

const responseFulfilledInterceptor = (response: AxiosResponse) => {
  console.info(
    getLogMessage(`✅ Got Response from %c${response.config.url}`),
    `color: ${ConsoleColors.URL}`,
    response
  );

  return response;
};

const responseRejectedInterceptor = (
  error: AxiosError<ServerErrorResponse>
) => {
  console.error(
    getLogMessage(`❌ Got Error from %c${error.response?.config?.url}`),
    `color: ${ConsoleColors.URL}`,
    error
  );

  if (axios.isAxiosError<ServerErrorResponse>(error)) {
    return handleAxiosError(error);
  }

  return Promise.reject(error);
};

export const httpClient = axios.create({
  timeout: 60 * 1 * 1000,
  timeoutErrorMessage: "Request Timeout",
});

httpClient.interceptors.request.use(
  requestFulfilledInterceptor,
  requestRejectedInterceptor
);

httpClient.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectedInterceptor
);
