import type { ApiErrorBody, ApiResponse } from "../types/api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "https://igsc-backend.vercel.app/api/v1";

const ACCESS_TOKEN_KEY = "igsc_access_token";

export class ApiError extends Error {
  statusCode: number;
  errorSources?: ApiErrorBody["errorSources"];

  constructor(body: ApiErrorBody) {
    super(body.message || "Request failed");
    this.name = "ApiError";
    this.statusCode = body.statusCode;
    this.errorSources = body.errorSources;
  }
}

export const tokenStore = {
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
  /** When true, a missing token still proceeds — useful for public forms. */
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined | null>;
};

const buildUrl = (
  path: string,
  query?: RequestOptions["query"],
): string => {
  const url = new URL(
    path.startsWith("http")
      ? path
      : `${API_URL}${path.startsWith("/") ? path : `/${path}`}`,
  );

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, query } = options;
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  // Always attach a stored token when present so optionalAuth routes pick it up.
  const token =
    options.token === undefined ? tokenStore.get() : options.token;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload: ApiResponse<T> | ApiErrorBody;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError({
      success: false,
      statusCode: response.status,
      message: "Invalid response from server",
    });
  }

  if (!response.ok || !payload.success) {
    throw new ApiError(payload as ApiErrorBody);
  }

  return payload as ApiResponse<T>;
}

export const api = {
  get: <T>(path: string, query?: RequestOptions["query"], _auth = false) =>
    apiRequest<T>(path, { method: "GET", query }),
  post: <T>(path: string, body?: unknown, _auth = false) =>
    apiRequest<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body?: unknown, _auth = true) =>
    apiRequest<T>(path, { method: "PATCH", body }),
  delete: <T>(path: string, _auth = true) =>
    apiRequest<T>(path, { method: "DELETE" }),
};

export const categoryName = (
  category: { name?: string } | string | undefined,
): string => {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.name || "";
};
