'use client';

import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateQueryString } from '@/lib';
import { useGetAllProducts } from '@/hooks';

export function HomepageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState({
    search: searchParams.get('search') || '',
    page: searchParams.get('page') || '1',
    category: searchParams.get('category') || '',
  });

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  const debounced = useDebouncedCallback((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: value,
      page: '1',
    }));
  }, 500);

  const queryString = generateQueryString(params);
  const { fetchAllProductsData } = useGetAllProducts(queryString);

  useEffect(() => {
    router.replace(queryString, { scroll: false });
  }, [queryString, router]);

  console.log({ fetchAllProductsData });

  return (
    <div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae illum
        mollitia labore facilis tempore eius! Autem, sequi? Incidunt obcaecati
        culpa aut aperiam maxime a maiores nam provident, corporis dicta neque.
      </p>
    </div>
  );
}
