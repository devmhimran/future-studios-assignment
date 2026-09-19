'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

export interface ProductParams {
  search: string;
  page: string;
  category: string;
  rating: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  limit: string;
}

interface ProductFilterContainerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  params: ProductParams;
  setParams: Dispatch<SetStateAction<ProductParams>>;
  onSearch: (value: string) => void;
}

export function ProductFilterContainer({ searchQuery, setSearchQuery, params, setParams, onSearch }: ProductFilterContainerProps) {
  const update = (key: keyof ProductParams, value: string) => setParams((current) => ({ ...current, [key]: value, page: '1' }));

  const clearFilters = () => {
    setSearchQuery('');
    setParams((current) => ({ ...current, search: '', page: '1', category: '', rating: '', minPrice: '', maxPrice: '', sort: 'featured' }));
  };

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50 sm:p-5'>
      <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
        <label className='relative flex-1'><span className='sr-only'>Search products</span><Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' /><Input className='h-11 rounded-2xl border-slate-200 pl-11 text-sm shadow-none' onChange={(event) => { setSearchQuery(event.target.value); onSearch(event.target.value); }} placeholder='Search products, brands, and more...' value={searchQuery} /></label>
        <div className='flex flex-wrap gap-2'>
          <select aria-label='Sort products' className='h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-500' onChange={(event) => update('sort', event.target.value)} value={params.sort}>
            <option value='featured'>Featured</option><option value='price-asc'>Price: low to high</option><option value='price-desc'>Price: high to low</option><option value='rating-desc'>Top rated</option><option value='newest'>Newest</option>
          </select>
          <Button className='h-11 rounded-2xl px-4' onClick={clearFilters} variant='outline'><X className='size-4' />Clear</Button>
        </div>
      </div>
      <div className='mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4'>
        <span className='flex items-center gap-2 text-sm font-semibold text-slate-700'><SlidersHorizontal className='size-4 text-violet-600' />Quick filters</span>
        <div className='flex items-center gap-2'><span className='text-sm text-slate-500'>Rating</span>{['4', '3', '2'].map((rating) => <button className={'rounded-full px-3 py-1.5 text-xs font-bold transition ' + (params.rating === rating ? 'bg-amber-400 text-amber-950' : 'bg-amber-50 text-amber-700 hover:bg-amber-100')} key={rating} onClick={() => update('rating', params.rating === rating ? '' : rating)}>{rating}+ ★</button>)}</div>
        <div className='flex items-center gap-2'><Input aria-label='Minimum price' className='h-8 w-24 rounded-xl border-slate-200 text-xs' min='0' onChange={(event) => update('minPrice', event.target.value)} placeholder='Min $' type='number' value={params.minPrice} /><span className='text-slate-300'>–</span><Input aria-label='Maximum price' className='h-8 w-24 rounded-xl border-slate-200 text-xs' min='0' onChange={(event) => update('maxPrice', event.target.value)} placeholder='Max $' type='number' value={params.maxPrice} /></div>
      </div>
    </section>
  );
}
