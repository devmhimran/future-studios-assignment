import { ENV } from '@/config/env';
import { createApiInstance } from './fetcher';

export const apiClient = createApiInstance({
  baseUrl: ENV.API_URL || '',
});
