// src/lib/api/client.ts
// Auto-generated - do not edit manually
import createClient from "openapi-fetch";
import type { paths } from "@/types/api";
import { createApiConfig } from "./config";
import { ApiError } from "./types";
import { tokenManager } from "@/lib/auth/token";

// Create typed API client
const baseClient = createClient<paths>(createApiConfig());

// Helper function to build URL with path parameters
const buildUrl = (
  baseUrl: string,
  path: string,
  pathParams?: Record<string, any>
): string => {
  let fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;

  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      if (value !== undefined) {
        fullUrl = fullUrl.replace(`{${key}}`, String(value));
      }
    });
  }

  return fullUrl;
};

// Helper function to build URL with query parameters
const buildUrlWithQuery = (
  url: string,
  queryParams?: Record<string, any>
): string => {
  if (!queryParams) return url;

  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString() ? `${url}?${searchParams.toString()}` : url;
};

// Helper function to make proxy requests
const makeProxyRequest = async (
  proxyUrl: string,
  url: string,
  method: string,
  headers: Record<string, string>,
  data?: any
) => {
  const proxyBody: any = {
    url,
    method,
    headers,
  };

  // Only include data for methods that typically have a body
  if (method !== "GET" && method !== "DELETE" && method !== "HEAD" && data) {
    proxyBody.data = data;
  }

  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proxyBody),
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Extract specific error message from API response
    let errorMessage = "Request failed";

    if (responseData.error_message) {
      // Handle API error format with error_code and error_message
      errorMessage = responseData.error_message;
    } else if (responseData.error) {
      // Handle generic error format
      errorMessage = responseData.error;
    } else if (responseData.message) {
      // Handle message format
      errorMessage = responseData.message;
    }

    throw new ApiError(errorMessage, response.status, responseData);
  }

  return { data: responseData, error: undefined, response };
};

// Extend the client with proxy capabilities
export const apiClient = {
  ...baseClient,

  async GET(path: string, params?: any) {
    const config = createApiConfig();
    const token = tokenManager.getToken();

    const baseUrl = buildUrl(config.baseUrl, path, params?.path);
    const fullUrl = buildUrlWithQuery(baseUrl, params?.query);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    return makeProxyRequest(config.proxyUrl, fullUrl, "GET", headers);
  },

  async POST(path: string, params?: any) {
    const config = createApiConfig();
    const token = tokenManager.getToken();

    const fullUrl = buildUrl(config.baseUrl, path, params?.path);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // For POST, the entire params object can be the data
    const data = params?.body || params;

    return makeProxyRequest(config.proxyUrl, fullUrl, "POST", headers, data);
  },

  async PUT(path: string, params?: any) {
    const config = createApiConfig();
    const token = tokenManager.getToken();

    const fullUrl = buildUrl(config.baseUrl, path, params?.path);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // For PUT, the entire params object can be the data
    const data = params?.body || params;

    return makeProxyRequest(config.proxyUrl, fullUrl, "PUT", headers, data);
  },

  async PATCH(path: string, params?: any) {
    const config = createApiConfig();
    const token = tokenManager.getToken();

    const fullUrl = buildUrl(config.baseUrl, path, params?.path);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // For PATCH, the entire params object can be the data
    const data = params?.body || params;

    return makeProxyRequest(config.proxyUrl, fullUrl, "PATCH", headers, data);
  },

  async DELETE(path: string, params?: any) {
    const config = createApiConfig();
    const token = tokenManager.getToken();

    const baseUrl = buildUrl(config.baseUrl, path, params?.path);
    const fullUrl = buildUrlWithQuery(baseUrl, params?.query);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // DELETE typically doesn't have a body, but allow it if explicitly provided
    const data = params?.body;

    return makeProxyRequest(config.proxyUrl, fullUrl, "DELETE", headers, data);
  },
};

// Auto-apply auth token to all requests except login
apiClient.use({
  onRequest({ request }) {
    // Skip adding auth token for login endpoint
    if (request.url.endsWith("/api/login")) {
      console.log("API Request (public):", {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      });
      return request;
    }

    const token = tokenManager.getToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    console.log("API Request:", {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    });
    return request;
  },
});

// Shared response handler - converts openapi-fetch responses to our format
export const handleApiResponse = async <T>(
  responsePromise: Promise<{ data?: T; error?: any; response: Response }>
): Promise<{ data?: T; error?: ApiError }> => {
  try {
    const { data, error, response } = await responsePromise;

    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data,
      error,
    });

    // Handle successful response
    if (response.ok) {
      return { data };
    }

    // Handle error response
    if (error) {
      // Handle API error format with error_code and error_message
      if (error.error_code && error.error_message) {
        throw new ApiError(error.error_message, response.status, {
          code: error.error_code,
          message: error.error_message,
        });
      }

      throw new ApiError(
        error.message || "API request failed",
        response.status,
        error
      );
    }

    // Handle unexpected error
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status
    );
  } catch (err) {
    console.error("API Error:", err);
    if (err instanceof ApiError) {
      return { error: err };
    }

    return {
      error: new ApiError(
        err instanceof Error ? err.message : "Unknown error occurred"
      ),
    };
  }
};
