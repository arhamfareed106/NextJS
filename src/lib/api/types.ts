// src/lib/api/types.ts
export class ApiError extends Error {
  constructor(message: string, public status?: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  response: Response;
}

export interface QueryConfig {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
  retryDelay?: number;
  select?: (data: any) => any;
}

export interface MutationConfig {
  onSuccess?: (data: any, variables: any) => void;
  onError?: (error: ApiError, variables: any) => void;
  onSettled?: (data: any, error: ApiError | null, variables: any) => void;
}

// Global error handler type
export interface GlobalErrorHandler {
  onError?: (error: ApiError) => void;
  showToast?: boolean;
  logError?: boolean;
}

// Global error handler instance
let globalErrorHandler: GlobalErrorHandler = {};

export const setGlobalErrorHandler = (handler: GlobalErrorHandler) => {
  globalErrorHandler = handler;
};

export const getGlobalErrorHandler = () => globalErrorHandler;
