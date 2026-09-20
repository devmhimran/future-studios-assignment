'use client';

import { Footer } from '@/components/shared';
import { useGetAllProducts, useGetCategories } from '@/hooks';
import { generateQueryString } from '@/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { CategorySection } from './category-section';
import { HeroSection } from './hero-section';
import { ProductsSection } from './products-section';
import ProductPagination from './products-pagination';
import { ProductFilterContainer } from './product-filter-container';

export function HomepageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState({
    search: searchParams.get('search') || '',
    page: searchParams.get('page') || '1',
    category: searchParams.get('category') || '',
    rating: searchParams.get('rating') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'featured',
  });
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );
  const debouncedSearch = useDebouncedCallback(
    (search: string) =>
      setParams((current) => ({ ...current, search, page: '1' })),
    350,
  );
  const queryString = generateQueryString(params);
  const { fetchAllProducts, fetchAllProductsData } =
    useGetAllProducts(queryString);
  const { fetchAllCategoriesData } = useGetCategories();
  const categories = fetchAllCategoriesData?.data ?? [];
  const products = fetchAllProductsData?.data ?? [];

  useEffect(() => {
    router.replace(queryString || '/', { scroll: false });
  }, [queryString, router]);

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const selectCategory = (category: string) =>
    setParams((current) => ({ ...current, category, page: '1' }));
  const handleCategorySelect = (category: string) => {
    selectCategory(category);
    if (category) scrollTo('shop');
  };
  const changePage = (page: number) => {
    setParams((current) => ({ ...current, page: String(page) }));
    scrollTo('shop');
  };

  return (
    <main className='min-h-screen overflow-hidden bg-[#F0EEDE5] text-[#004643]'>
      <HeroSection onBrowseCategories={() => scrollTo('discover')} />
      <CategorySection
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      <ProductFilterContainer
        meta={fetchAllProductsData?.meta}
        onSearch={debouncedSearch}
        params={params}
        searchQuery={searchQuery}
        setParams={setParams}
        setSearchQuery={setSearchQuery}
      />
      <ProductsSection
        isLoading={fetchAllProducts.isLoading}
        products={products}
      />

      <ProductPagination
        meta={fetchAllProductsData?.meta}
        onPageChange={changePage}
      />
      <Footer />
    </main>
  );
}
