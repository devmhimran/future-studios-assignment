import { apiClient } from '@/lib';
import { Category, Response } from '@/types';

const path = `/categories`;

export const categoriesAPI = {
  getCategories: (params?: string) => {
    const url = path + (params ? `${params}` : '');
    return apiClient.get<Response<Category[]>>(url);
  },
};
