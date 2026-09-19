import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';
import { PackageOpen } from 'lucide-react';
import { ProductCard } from '../home/product-card';

interface ShopProductsGridProps {
  isLoading: boolean;
  products: Product[];
}

export function ShopProductsGrid({ isLoading, products }: ShopProductsGridProps) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton className='aspect-[.72] rounded-sm' key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className='grid min-h-80 place-items-center border border-dashed border-[#004643]/30 bg-[#F0EEDE]/60 text-center'>
        <div>
          <PackageOpen className='mx-auto size-10 text-[#004643]/50' />
          <h2 className='mt-3 font-semibold text-[#004643]'>No products found</h2>
          <p className='mt-1 text-sm text-[#004643]/65'>
            Try changing your filters or search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
