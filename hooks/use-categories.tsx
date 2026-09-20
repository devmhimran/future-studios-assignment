'use client';

import { categoriesAPI } from '@/api';
import { Category, Response } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useGetCategories(options?: string) {
  const fetchAllCategories = useQuery<Response<Category[]>>({
    queryKey: ['categories', options],
    queryFn: async () => {
      const res = await categoriesAPI
        .getCategories(options)
        .then((response) => response.data);
      return res;
    },
    placeholderData: keepPreviousData,
  });

  return {
    fetchAllCategories,
    fetchAllCategoriesData: fetchAllCategories.data,
  };
}
