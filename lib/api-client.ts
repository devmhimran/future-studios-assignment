import { createApiInstance } from './fetcher';

export const apiClient = createApiInstance({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
});
