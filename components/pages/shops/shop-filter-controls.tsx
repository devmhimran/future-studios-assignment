import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ProductParams } from '@/components/shared/product-filter-container';
import type { Category } from '@/types';
import { Star, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface ShopFilterControlsProps {
  categories: Category[];
  isCategoriesLoading: boolean;
  params: ProductParams;
  setParams: Dispatch<SetStateAction<ProductParams>>;
}

export function ShopFilterControls({
  categories,
  isCategoriesLoading,
  params,
  setParams,
}: ShopFilterControlsProps) {
  const update = (key: keyof ProductParams, value: string) =>
    setParams((current) => ({ ...current, [key]: value, page: '1' }));
  const clearFilters = () =>
    setParams((current) => ({
      ...current,
      category: '',
      rating: '',
      minPrice: '',
      maxPrice: '',
      sort: 'featured',
      page: '1',
    }));

  return (
    <div className='space-y-7 '>
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold text-[#004643]'>Categories</h2>
          <Button
            className='h-auto px-0 text-xs text-[#004643]/60 hover:bg-transparent hover:text-[#004643]'
            onClick={() => update('category', '')}
            variant='ghost'
          >
            All
          </Button>
        </div>
        <div className='mt-3 grid gap-1'>
          {isCategoriesLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  className='h-8 animate-pulse rounded bg-[#004643]/10'
                  key={index}
                />
              ))
            : categories.map((category) => (
                <Button
                  className={
                    params.category === category.slug
                      ? 'justify-start bg-[#004643] text-[#F0EEDE] hover:bg-[#004643] hover:text-[#F0EEDE]'
                      : 'justify-start text-[#004643]/75 hover:bg-[#004643]/10 hover:text-[#004643]'
                  }
                  key={category.id}
                  onClick={() => update('category', category.slug)}
                  variant='ghost'
                >
                  {category.name}
                </Button>
              ))}
        </div>
      </div>
      <div className='border-t border-[#004643]/15 pt-6'>
        <h2 className='text-sm font-semibold text-[#004643]'>Price range</h2>
        <div className='mt-3 grid grid-cols-2 gap-2'>
          <Input
            aria-label='Minimum price'
            className='border-[#004643]/20 bg-transparent text-[#004643] placeholder:text-[#004643]/40'
            min='0'
            onChange={(event) => update('minPrice', event.target.value)}
            placeholder='Min $'
            type='number'
            value={params.minPrice}
          />
          <Input
            aria-label='Maximum price'
            className='border-[#004643]/20 bg-transparent text-[#004643] placeholder:text-[#004643]/40'
            min='0'
            onChange={(event) => update('maxPrice', event.target.value)}
            placeholder='Max $'
            type='number'
            value={params.maxPrice}
          />
        </div>
      </div>
      <div className='border-t border-[#004643]/15 pt-6'>
        <h2 className='text-sm font-semibold text-[#004643]'>
          Customer rating
        </h2>
        <div className='mt-3 flex flex-wrap gap-2'>
          {['4', '3', '2'].map((rating) => (
            <Button
              className={
                params.rating === rating
                  ? 'bg-[#004643] text-[#f7f7ed] hover:bg-[#004643] hover:text-[#f7f7ed]'
                  : 'border-[#004643]/20 text-[#004643] hover:bg-[#004643]/10'
              }
              key={rating}
              onClick={() =>
                update('rating', params.rating === rating ? '' : rating)
              }
              size='sm'
              variant='outline'
            >
              {rating}+ <Star className='size-3 fill-current' />
            </Button>
          ))}
        </div>
      </div>
      <Button
        className='w-full  text-[#F0EEDE] bg-[#004643] hover:bg-[#004643]/80 hover:text-[#F0EEDE]'
        onClick={clearFilters}
        variant='outline'
      >
        <X className='size-4' />
        Clear filters
      </Button>
    </div>
  );
}
