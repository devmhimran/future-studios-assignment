import type { Product } from '@/types';
import { PackageOpen } from 'lucide-react';
import { ProductCard } from './product-card';

interface ProductsSectionProps {
  isLoading: boolean;
  products: Product[];
}

export function ProductsSection({
  isLoading,

  products,
}: ProductsSectionProps) {
  return (
    <section className='mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8'>
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
