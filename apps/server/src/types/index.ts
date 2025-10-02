export type ApiResponse<T = unknown> = {
    data?: T;
    error?: string;
    code?: string;
    message?: string;
  };
  
  export type HealthCheckResponse = {
    message: string;
    status: string;
    timestamp: string;
    endpoints: string[];
  };
  
  export type AdminCheckResponse = {
    isAdmin: boolean;
  };
  
  export type ErrorResponse = {
    error: string;
    code: string;
  };
  