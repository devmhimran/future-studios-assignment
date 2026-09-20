import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { ProductDetail } from '@/types';

interface ProductInfoProps {
  product: ProductDetail;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.16em] text-[#004643]/60'>
          {product.brand}
        </p>
        <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#004643] sm:text-4xl'>
          {product.title}
        </h1>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              className={`size-4 ${
                i < Math.round(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-200 text-slate-200'
              }`}
              key={i}
            />
          ))}
        </div>
        <span className='text-sm font-medium text-[#004643]'>
          {product.rating}
        </span>
        <span className='text-sm text-[#004643]/50'>
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className='flex items-baseline gap-3'>
        <span className='text-3xl font-bold text-[#004643]'>
          {formatPrice(product.price)}
        </span>
        {discount > 0 && (
          <>
            <span className='text-lg text-[#004643]/40 line-through'>
              {formatPrice(product.originalPrice)}
            </span>
            <Badge className='bg-[#004643] text-white hover:bg-[#004643]'>
              -{discount}%
            </Badge>
          </>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <span
          className={`size-2.5 rounded-full ${
            product.availabilityStatus === 'In Stock'
              ? 'bg-emerald-500'
              : 'bg-amber-500'
          }`}
        />
        <span className='text-sm font-medium text-[#004643]'>
          {product.availabilityStatus}
        </span>
        <span className='text-sm text-[#004643]/50'>
          — {product.stock} units available
        </span>
      </div>

      <p className='text-[#004643]/70 leading-relaxed'>
        {product.description}
      </p>
    </div>
  );
}
