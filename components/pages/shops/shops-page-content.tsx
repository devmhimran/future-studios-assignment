'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useGetAllProducts, useGetCategories } from '@/hooks';
import { generateQueryString } from '@/lib';
import { Filter, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ShopFilterControls } from './shop-filter-controls';
import { ShopPagination } from './shop-pagination';
import { ShopProductsGrid } from './shop-products-grid';

export function ShopsPageContent() {
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
  const { fetchAllCategories, fetchAllCategoriesData } = useGetCategories();
  const products = fetchAllProductsData?.data ?? [];
  const categories = fetchAllCategoriesData?.data ?? [];
  const meta = fetchAllProductsData?.meta;

  useEffect(() => {
    router.replace(`/shops${queryString}`, { scroll: false });
  }, [queryString, router]);

  const handleSearch = (search: string) => {
    setSearchQuery(search);
    debouncedSearch(search);
  };
  const updateSort = (sort: string) =>
    setParams((current) => ({ ...current, sort, page: '1' }));
  const changePage = (page: number) => {
    setParams((current) => ({ ...current, page: String(page) }));
    document
      .getElementById('shop-results')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className='min-h-screen bg-[#F0EEDE5] text-[#004643]'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#004643]/60'>
          The collection
        </p>
        <h1 className='mt-3 text-4xl font-medium tracking-tight sm:text-5xl'>
          Shop all products
        </h1>

        <label className='relative mt-8 block lg:hidden'>
          <span className='sr-only'>Search products</span>
          <Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#004643]/45' />
          <Input
            className='h-12 border-[#004643]/20 bg-[#F0EEDE] pl-11 text-[#004643] placeholder:text-[#004643]/45'
            onChange={(event) => handleSearch(event.target.value)}
            placeholder='Search products'
            value={searchQuery}
          />
        </label>

        <div className='mt-6 flex items-center justify-between gap-3 lg:hidden'>
          <p className='text-sm text-[#004643]/65'>
            {meta ? `${meta.total} products found` : 'Finding products...'}
          </p>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  className='border-[#004643]/25 text-[#004643] hover:bg-[#004643]/10'
                  variant='outline'
                />
              }
            >
              <Filter className='size-4' />
              Filters
            </SheetTrigger>
            <SheetContent
              className='max-h-[85dvh] overflow-y-auto border-[#004643]/15 bg-[#F0EEDE] text-[#004643]'
              side='bottom'
            >
              <SheetHeader>
                <SheetTitle className='text-[#004643]'>Filters</SheetTitle>
              </SheetHeader>
              <div className='px-4 pb-8'>
                <ShopFilterControls
                  categories={categories}
                  isCategoriesLoading={fetchAllCategories.isLoading}
                  params={params}
                  setParams={setParams}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className='mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]'>
          <aside className='hidden lg:block bg-[#f7f7ed]'>
            <div className='sticky top-24 border border-[#004643]/15 bg-[#F0EEDE]/60 p-5'>
              <label className='relative block'>
                <span className='sr-only'>Search products</span>
                <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#004643]/45' />
                <Input
                  className='h-10 border-[#004643]/20 bg-transparent pl-10 text-[#004643] placeholder:text-[#004643]/45'
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder='Search products'
                  value={searchQuery}
                />
              </label>
              <div className='mt-6'>
                <ShopFilterControls
                  categories={categories}
                  isCategoriesLoading={fetchAllCategories.isLoading}
                  params={params}
                  setParams={setParams}
                />
              </div>
            </div>
          </aside>

          <section id='shop-results' className='min-w-0 scroll-mt-24'>
            <div className='mb-6 hidden items-center justify-between gap-4 lg:flex'>
              <p className='text-sm text-[#004643]/65'>
                {meta ? `${meta.total} products found` : 'Finding products...'}
              </p>
              <label className='flex items-center gap-2 text-sm text-[#004643]/65'>
                Sort by
                <select
                  className='h-9 border border-[#004643]/20 bg-[#F0EEDE] px-2 text-sm text-[#004643] outline-none focus:border-[#004643]'
                  onChange={(event) => updateSort(event.target.value)}
                  value={params.sort}
                >
                  <option value='featured'>Featured</option>
                  <option value='price-asc'>Price: low to high</option>
                  <option value='price-desc'>Price: high to low</option>
                  <option value='rating-desc'>Top rated</option>
                  <option value='newest'>Newest</option>
                </select>
              </label>
            </div>
            <ShopProductsGrid
              isLoading={fetchAllProducts.isLoading}
              products={products}
            />
            <ShopPagination meta={meta} onPageChange={changePage} />
          </section>
        </div>
      </div>
    </main>
  );
}
