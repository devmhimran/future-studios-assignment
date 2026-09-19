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
}

export function ShopsPhoneFilter({
  handleSearch,
  searchQuery,
  meta,
  params,
  setParams,
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
