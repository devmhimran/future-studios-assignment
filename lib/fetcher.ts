import {
  ApiError,
  ApiErrorPayload,
  ApiResponse,
  FetchOptions,
  QueryParams,
} from '@/types';

function buildQueryString(params?: QueryParams): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export function createApiInstance(defaultOptions: FetchOptions = {}) {
  const { baseUrl = '', beforeRequest, ...instanceDefaults } = defaultOptions;

  async function request<T = unknown>(
    url: string,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> {
    const mergedOptions = {
      ...instanceDefaults,
      ...options,
    };

    const { params, data, headers, onResponseError, ...config } = mergedOptions;

    const fullUrl = `${baseUrl}${url}${buildQueryString(params)}`;
    const finalHeaders = new Headers(headers);

    beforeRequest?.(finalHeaders);

    let body: BodyInit | null = null;

    if (data !== undefined && data !== null) {
      if (data instanceof FormData) {
        body = data;
        finalHeaders.delete('Content-Type');
      } else if (
        typeof data === 'string' ||
        data instanceof Blob ||
        data instanceof ArrayBuffer
      ) {
        body = data;
      } else {
        finalHeaders.set('Content-Type', 'application/json');
        body = JSON.stringify(data);
      }
    }

    const fetchConfig: RequestInit = {
      ...config,
      headers: finalHeaders,
      body,
      credentials: 'omit',
    };

    try {
      const response = await fetch(fullUrl, fetchConfig);
      const contentType = response.headers.get('content-type');

      const responseData: unknown = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        if (typeof responseData === 'object' && responseData !== null) {
          const raw = responseData as ApiErrorPayload;
          const errObj = raw.error || raw;

          if (Array.isArray(errObj.details) && errObj.details.length > 0) {
            const firstDetail = errObj.details[0];
            if (typeof firstDetail === 'string') {
              errorMessage = firstDetail;
            } else if (firstDetail && typeof firstDetail.message === 'string') {
              errorMessage = firstDetail.message;
            }
          } else if (typeof errObj.message === 'string') {
            errorMessage = errObj.message;
          }
        }

        throw new ApiError(errorMessage, response.status, responseData);
      }

      return {
        data: responseData as T,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError(
              error instanceof Error ? error.message : 'Network request failed',
              0,
              null,
            );

      onResponseError?.(apiError);

      throw apiError;
    }
  }

  return {
    get: <T = unknown>(url: string, options?: FetchOptions) =>
      request<T>(url, {
        ...options,
        method: 'GET',
      }),

    post: <T = unknown>(url: string, data?: unknown, options?: FetchOptions) =>
      request<T>(url, {
        ...options,
        method: 'POST',
        data,
      }),

    put: <T = unknown>(url: string, data?: unknown, options?: FetchOptions) =>
      request<T>(url, {
        ...options,
        method: 'PUT',
        data,
      }),

    patch: <T = unknown>(url: string, data?: unknown, options?: FetchOptions) =>
      request<T>(url, {
        ...options,
        method: 'PATCH',
        data,
      }),

    delete: <T = unknown>(url: string, options?: FetchOptions) =>
      request<T>(url, {
        ...options,
        method: 'DELETE',
      }),
  };
}
