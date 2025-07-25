// src/lib/api/config.ts
import { tokenManager } from "@/lib/auth/token";

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  proxyUrl: "/api/proxy",
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const;

export const createApiConfig = (
  additionalHeaders: Record<string, string> = {}
) => ({
  baseUrl: API_CONFIG.baseUrl,
  proxyUrl: API_CONFIG.proxyUrl,
  headers: {
    ...DEFAULT_HEADERS,
    ...(tokenManager.getToken() && {
      Authorization: `Bearer ${tokenManager.getToken()}`,
    }),
    ...additionalHeaders,
  },
  credentials: "include" as const,
  mode: "cors" as const,
});
