// src/lib/api/hooks.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError, QueryConfig, getGlobalErrorHandler } from "./types";

// Type guard to check if error is ApiError
const isApiError = (error: any): error is ApiError => {
  return (
    error instanceof ApiError ||
    (error && typeof error === "object" && error.name === "ApiError")
  );
};

const handleGlobalError = (error: unknown) => {
  const globalHandler = getGlobalErrorHandler();

  // Always log errors unless explicitly disabled
  if (globalHandler.logError !== false) {
    console.error("API Error:", error);
  }

  // Call custom error handler if provided and error is ApiError
  if (globalHandler.onError && isApiError(error)) {
    globalHandler.onError(error);
  }

  // Add toast notification if enabled
  if (globalHandler.showToast && typeof window !== "undefined") {
    const message = isApiError(error) ? error.message : "An error occurred";
    // You can integrate with your toast library here
    // Example: toast.error(message)
    console.warn(
      "Toast notification enabled but not implemented. Error:",
      message
    );
  }
};

export function useTypedQuery<TData, TError = ApiError>(
  queryKey: (string | number | boolean | object)[],
  queryFn: () => Promise<{ data?: TData; error?: TError }>,
  options: QueryConfig &
    Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> = {}
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await queryFn();
      if (result.error) {
        throw result.error;
      }
      return result.data as TData;
    },
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes default
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes default
    retry: options.retry ?? 3,
    ...options,
  });
}

export function useTypedMutation<TData, TVariables = any, TError = ApiError>(
  mutationFn: (
    variables: TVariables
  ) => Promise<{ data?: TData; error?: TError }>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
    onSettled?: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables
    ) => void;
  } & Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> = {}
) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const result = await mutationFn(variables);
      if (result.error) {
        throw result.error;
      }
      return result.data as TData;
    },
    onSuccess: (data, variables) => {
      options.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      handleGlobalError(error);
      options.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options.onSettled?.(data, error, variables);
    },
    ...options,
  });
}
