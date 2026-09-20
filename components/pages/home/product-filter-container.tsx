'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Meta } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

export interface ProductParams {
  [key: string]: string;
  search: string;
  page: string;
  category: string;
  rating: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface ProductFilterContainerProps {
  searchQuery: string;
  meta?: Meta;
  setSearchQuery: (value: string) => void;
  params: ProductParams;
  setParams: Dispatch<SetStateAction<ProductParams>>;
  onSearch: (value: string) => void;
}

export function ProductFilterContainer({
  searchQuery,
  setSearchQuery,
  params,
  setParams,
  onSearch,
  meta,
}: ProductFilterContainerProps) {
  const update = (key: keyof ProductParams, value: string) =>
    setParams((current) => ({ ...current, [key]: value, page: '1' }));

  const clearFilters = () => {
    setSearchQuery('');
    setParams((current) => ({
      ...current,
      search: '',
      page: '1',
      category: '',
      rating: '',
      minPrice: '',
      maxPrice: '',
      sort: 'featured',
    }));
  };

  return (
    <section
      id='shop'
      className='mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8'
    >
      <div className='mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.18em] text-[#004643]/65'>
            The latest edit
          </p>
          <h2 className='mt-2 text-3xl font-medium tracking-tight text-[#004643] sm:text-4xl'>
            Products you will love
          </h2>
        </div>
        <p className='text-sm text-[#004643]/65'>
          {meta
            ? `${meta.total} products found`
            : 'Finding beautiful things...'}
        </p>
      </div>

      <div className='rounded-3xl border border-[#004643]/15 bg-[#f7f7ed] p-4 shadow-sm shadow-slate-200/50 sm:p-5'>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
          <label className='relative flex-1'>
            <span className='sr-only'>Search products</span>
            <Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
            <Input
              className='h-11 rounded-2xl border-slate-200 pl-11 text-sm shadow-none'
              onChange={(event) => {
                setSearchQuery(event.target.value);
                onSearch(event.target.value);
              }}
              placeholder='Search products, brands, and more...'
              value={searchQuery}
            />
          </label>
          <div className='flex flex-wrap gap-2'>
            <select
              aria-label='Sort products'
              className='h-11 rounded-2xl border border-[#004643]/20 bg-[#f7f7ed] px-3 text-sm font-medium text-[#004643] outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643]'
              onChange={(event) => update('sort', event.target.value)}
              value={params.sort}
            >
              <option value='featured'>Featured</option>
              <option value='price-asc'>Price: low to high</option>
              <option value='price-desc'>Price: high to low</option>
              <option value='rating-desc'>Top rated</option>
              <option value='newest'>Newest</option>
            </select>
            <Button
              className='h-11 rounded-2xl px-4 bg-[#004643] text-[#F0EEDE] hover:bg-[#004643]/80 hover:text-[#F0EEDE]'
              onClick={clearFilters}
              variant='outline'
            >
              <X className='size-4' />
              Clear
            </Button>
          </div>
        </div>
        <div className='mt-4 flex flex-wrap items-center gap-3 border-t border-[#004643]/15 pt-4'>
          <span className='flex items-center gap-2 text-sm font-semibold text-[#004643]'>
            <SlidersHorizontal className='size-4 text-[#004643]' />
            Quick filters
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-slate-500'>Rating</span>
            {['4', '3', '2'].map((rating) => (
              <button
                className={
                  'rounded-full px-3 py-1.5 text-xs font-bold transition ' +
                  (params.rating === rating
                    ? 'bg-amber-400 text-amber-950'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100')
                }
                key={rating}
                onClick={() =>
                  update('rating', params.rating === rating ? '' : rating)
                }
              >
                {rating}+ ★
              </button>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <Input
              aria-label='Minimum price'
              className='h-8 w-24 rounded-xl border-slate-200 text-xs'
              min='0'
              onChange={(event) => update('minPrice', event.target.value)}
              placeholder='Min $'
              type='number'
              value={params.minPrice}
            />
            <span className='text-slate-300'>–</span>
            <Input
              aria-label='Maximum price'
              className='h-8 w-24 rounded-xl border-slate-200 text-xs'
              min='0'
              onChange={(event) => update('maxPrice', event.target.value)}
              placeholder='Max $'
              type='number'
              value={params.maxPrice}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
