import { apiClient } from '@/lib';

const path = `/categories`;

export const categoriesAPI = {
  getCategories: (params?: string) => {
    const url = path + (params ? `${params}` : '');
    return apiClient.get(url);
  },
};
