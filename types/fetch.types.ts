export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export class ApiError<T = unknown> extends Error {
  status: number;
  data: T;

  constructor(message: string, status: number, data: T) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  baseUrl?: string;
  params?: QueryParams;
  data?: unknown;
  onResponseError?: (error: ApiError<unknown>) => void;
  beforeRequest?: (headers: Headers) => void;
}

export interface ApiErrorPayload {
  message?: string;
  code?: string;
  details?: (ErrorDetail | string)[];
  error?: ApiErrorPayload;
}

export interface ErrorDetail {
  path?: string;
  message?: string;
}
