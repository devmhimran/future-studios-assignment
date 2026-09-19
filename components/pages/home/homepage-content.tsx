'use client';

import { Footer, Navbar } from '@/components/shared';
import { useGetAllProducts, useGetCategories } from '@/hooks';
import { generateQueryString } from '@/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { CategorySection } from './category-section';
import { HeroSection } from './hero-section';
import { ProductsSection } from './products-section';

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
    limit: '12',
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
    <main
      id='top'
      className='min-h-screen overflow-hidden bg-[#F0EEDE5] text-[#004643]'
    >
      <Navbar
        activeCategory={params.category}
        categories={categories}
        onCategoryChange={selectCategory}
      />
      <HeroSection
        onBrowseCategories={() => scrollTo('discover')}
        onShop={() => scrollTo('shop')}
      />
      <CategorySection
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      <ProductsSection
        isLoading={fetchAllProducts.isLoading}
        meta={fetchAllProductsData?.meta}
        onPageChange={changePage}
        onSearch={debouncedSearch}
        params={params}
        products={products}
        searchQuery={searchQuery}
        setParams={setParams}
        setSearchQuery={setSearchQuery}
      />
      <Footer />
    </main>
  );
}
