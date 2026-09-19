import { apiClient } from '@/lib';
import type { Product, ProductDetail, Response } from '@/types';

const path = `/products`;

export const productAPI = {
  getProducts: (params?: string) => {
    const url = path + (params ? `${params}` : '');
    return apiClient.get<Response<Product[]>>(url);
  },
  getProductBySlug(slug: string) {
    const url = `${path}/${slug}`;
    return apiClient.get<{ data: ProductDetail }>(url);
  },
};
