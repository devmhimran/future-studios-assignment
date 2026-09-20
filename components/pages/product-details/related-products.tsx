import { ProductCard } from '@/components/pages/home/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ProductDetail } from '@/types';

interface RelatedProductsProps {
  products: ProductDetail[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <section className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-semibold tracking-tight text-[#004643]'>
        Related products
      </h2>
      <p className='mt-1 text-sm text-[#004643]/55'>
        You might also like these
      </p>

      <div className='relative mt-6 px-14'>
        <Carousel opts={{ align: 'start', loop: false }} className='w-full'>
          <CarouselContent className='-ml-4 p-2'>
            {products.map((product) => (
              <CarouselItem
                className='pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'
                key={product.slug}
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-12 text-[#004643] border-[#004643]/20 hover:bg-[#004643]/5' />
          <CarouselNext className='-right-12 text-[#004643] border-[#004643]/20 hover:bg-[#004643]/5' />
        </Carousel>
      </div>
    </section>
  );
}
