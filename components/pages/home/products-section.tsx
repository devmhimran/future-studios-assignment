import { ProductFilterContainer } from '@/components/shared';
import type { ProductParams } from '@/components/shared/product-filter-container';
import { Button } from '@/components/ui/button';
import type { Meta, Product } from '@/types';
import { ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { ProductCard } from './product-card';

interface ProductsSectionProps {
  isLoading: boolean;
  meta?: Meta;
  onPageChange: (page: number) => void;
  onSearch: (value: string) => void;
  params: ProductParams;
  products: Product[];
  searchQuery: string;
  setParams: Dispatch<SetStateAction<ProductParams>>;
  setSearchQuery: (value: string) => void;
}

export function ProductsSection({
  isLoading,
  meta,
  onPageChange,
  onSearch,
  params,
  products,
  searchQuery,
  setParams,
  setSearchQuery,
}: ProductsSectionProps) {
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
      <ProductFilterContainer
        onSearch={onSearch}
        params={params}
        searchQuery={searchQuery}
        setParams={setParams}
        setSearchQuery={setSearchQuery}
      />
      {isLoading ? (
        <div className='grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className='aspect-[.72] animate-pulse rounded-3xl bg-slate-200'
              key={index}
            />
          ))}
        </div>
      ) : products.length ? (
        <>
          <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {meta && meta.totalPages > 1 && (
            <div className='mt-10 flex items-center justify-center gap-3'>
              <Button
                aria-label='Previous page'
                className='rounded-xl'
                disabled={meta.page <= 1}
                onClick={() => onPageChange(meta.page - 1)}
                size='icon-lg'
                variant='outline'
              >
                <ChevronLeft />
              </Button>
              <span className='text-sm font-semibold text-slate-600'>
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                aria-label='Next page'
                className='rounded-xl'
                disabled={meta.page >= meta.totalPages}
                onClick={() => onPageChange(meta.page + 1)}
                size='icon-lg'
                variant='outline'
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='mt-8 grid min-h-72 place-items-center border border-dashed border-[#004643]/30 bg-[#F0EEDE]/60 text-center'>
          <div>
            <PackageOpen className='mx-auto size-10 text-[#004643]/50' />
            <h3 className='mt-3 font-bold text-[#004643]'>No products found</h3>
            <p className='mt-1 text-sm text-[#004643]/65'>
              Try clearing a filter or searching for something else.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
