import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;
  return (
    <Card
      className='group overflow-hidden rounded-sm bg-[#f7f7ed]/60 p-3 text-[#004643] ring-[#004643]/15 transition hover:ring-[#004643]/45'
      size='sm'
    >
      <div className='relative aspect-square overflow-hidden bg-slate-100'>
        <Image
          alt={product.title}
          className='size-full object-cover transition duration-500 group-hover:scale-105'
          loading='lazy'
          src={product.thumbnail}
          width={220}
          height={220}
        />
        {discount > 0 && (
          <Badge className='absolute left-3 top-3 bg-[#004643] text-white hover:bg-[#004643]'>
            -{discount}%
          </Badge>
        )}
        <Link href={`/shops/${product.slug}`} className='absolute inset-0'>
          <Button
            aria-label={`Add ${product.title} to cart`}
            className='absolute bottom-3 right-3 size-10 translate-y-14 rounded-full bg-[#004643] p-0 text-white opacity-0 transition duration-300 hover:bg-[#003d3a] group-hover:translate-y-0 group-hover:opacity-100'
            size='icon'
            variant='default'
          >
            <ArrowRight className='size-4' />
          </Button>
        </Link>
      </div>
      <CardContent className='px-1 pb-1 pt-4'>
        <p className='truncate text-xs font-bold uppercase tracking-[0.16em] text-[#004643]/60'>
          {product.brand}
        </p>
        <h3 className='mt-1 truncate font-semibold text-[#004643]'>
          {product.title}
        </h3>
        <div className='mt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-2'>
          <div className='flex items-baseline gap-1.5'>
            <span className='font-bold text-[#004643]'>
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className='text-xs text-[#004643]/45 line-through'>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className='flex items-center gap-1 text-xs font-semibold text-[#004643]'>
            <Star className='size-3 fill-current' />
            {product.rating && <span>{product.rating}</span>}
            {product.rating && <span>({product.reviewCount})</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
