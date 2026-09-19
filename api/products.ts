import { apiClient } from '@/lib';

const path = `/products`;

export const productAPI = {
  getProducts: (params?: string) => {
    const url = path + (params ? `${params}` : '');
    return apiClient.get(url);
  },
  getProductBySlug(slug: string) {
    const url = `${path}/${slug}`;
    return apiClient.get(url);
  },
};
