'use client';

import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import { ShopFilterControls } from './shop-filter-controls';
import { useGetCategories } from '@/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { ProductParams } from '../home';
import { Meta } from '@/types';
import { CustomSheet } from '@/components/shared';
import { Button } from '@/components/ui/button';

export interface ShopsPhoneFilterProps {
  handleSearch: (search: string) => void;
  searchQuery: string;
  meta?: Meta;
  params: ProductParams;
  setParams: Dispatch<SetStateAction<ProductParams>>;
  updateSort?: (sort: string) => void;
}

export function ShopsPhoneFilter({
  handleSearch,
  searchQuery,
  meta,
  params,
  setParams,
  updateSort,
}: ShopsPhoneFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { fetchAllCategories, fetchAllCategoriesData } = useGetCategories();
  const categories = fetchAllCategoriesData?.data ?? [];
  return (
    <div>
      <label className='relative mt-8 block lg:hidden'>
        <span className='sr-only'>Search products</span>

        <Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#004643]/45' />

        <Input
          className='rounded-none h-12 border-[#004643]/20 bg-[#F0EEDE] pl-11 text-[#004643] placeholder:text-[#004643]/45'
          onChange={(event) => handleSearch(event.target.value)}
          placeholder='Search products'
          value={searchQuery}
        />
      </label>

      <div className='mb-6 lg:hidden items-center justify-between gap-4 block mt-2'>
        <label className='flex between items-center gap-2 text-sm text-[#004643]/65'>
          Sort by
          <select
            className='w-3/6 ml-auto h-9 border border-[#004643]/20 bg-[#F0EEDE] px-2 text-sm text-[#004643] outline-none focus:border-[#004643]'
            onChange={(event) => updateSort && updateSort(event.target.value)}
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

      <div className='mt-6 flex items-center justify-between gap-3 lg:hidden'>
        <p className='text-sm text-[#004643]/65'>
          {meta ? `${meta.total} products found` : 'Finding products...'}
        </p>

        <Button
          className='border-[#004643]/25 text-[#004643] hover:bg-[#004643]/10'
          variant='outline'
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className='size-4' />
          Filters
        </Button>
      </div>

      <CustomSheet
        title='Filters'
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        side='bottom'
        className='max-h-[85dvh] overflow-y-auto border-[#004643]/15 bg-[#F0EEDE] text-[#004643]'
      >
        <div className='px-4 pb-8'>
          <ShopFilterControls
            categories={categories}
            isCategoriesLoading={fetchAllCategories.isLoading}
            params={params}
            setParams={setParams}
          />
        </div>
      </CustomSheet>
    </div>
  );
}
