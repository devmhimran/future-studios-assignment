'use client';

import { productAPI } from '@/api';
import { Product, Response } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useGetAllProducts(options?: string) {
  const fetchAllProducts = useQuery<Response<Product[]>>({
    queryKey: ['products', options],
    queryFn: async () => {
      const res = await productAPI
        .getProducts(options)
        .then((response) => response.data);
      return res;
    },
    placeholderData: keepPreviousData,
  });

  return {
    fetchAllProducts,
    fetchAllProductsData: fetchAllProducts.data,
  };
}

export function useGetProductBySlug(slug: string) {
  const fetchProductBySlug = useQuery<Response<Product>>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await productAPI
        .getProductBySlug(slug)
        .then((response) => response.data);
      return res;
    },
    placeholderData: keepPreviousData,
  });

  return {
    fetchProductBySlug,
    fetchProductBySlugData: fetchProductBySlug.data,
  };
}
