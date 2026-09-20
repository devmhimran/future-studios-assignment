import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { Category, ProductDetail } from '@/types';

interface ProductFeaturesProps {
  product: ProductDetail;
  category?: Category;
}

export function ProductFeatures({ product, category }: ProductFeaturesProps) {
  return (
    <div className='space-y-5 border-t border-[#004643]/10 pt-6'>
      {product.features.length > 0 && (
        <div>
          <h2 className='text-sm font-semibold text-[#004643]'>Features</h2>
          <ul className='mt-3 grid gap-2.5'>
            {product.features.map((feature) => (
              <li className='flex items-start gap-2.5' key={feature}>
                <span className='mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#004643]/10'>
                  <Check className='size-3 text-[#004643]' />
                </span>
                <span className='text-sm text-[#004643]/75'>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.tags.length > 0 && (
        <div>
          <h2 className='text-sm font-semibold text-[#004643]'>Tags</h2>
          <div className='mt-3 flex flex-wrap gap-2'>
            {product.tags.map((tag) => (
              <Badge
                className='bg-[#004643]/5 text-[#004643]/70 hover:bg-[#004643]/10'
                key={tag}
                variant='secondary'
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className='grid grid-cols-2 gap-4 rounded-sm border border-[#004643]/10 p-4'>
        <div>
          <p className='text-xs text-[#004643]/50'>SKU</p>
          <p className='mt-0.5 text-sm font-medium text-[#004643]'>
            {product.sku}
          </p>
        </div>
        <div>
          <p className='text-xs text-[#004643]/50'>Category</p>
          <p className='mt-0.5 text-sm font-medium text-[#004643]'>
            {category?.name ?? '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
