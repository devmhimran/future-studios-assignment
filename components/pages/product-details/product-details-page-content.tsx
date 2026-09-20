'use client';

import { useParams } from 'next/navigation';
import { useGetProductBySlug } from '@/hooks';
import { ProductDetailsSkeleton } from './product-details-skeleton';
import { ProductImageGallery } from './product-image-gallery';
import { ProductInfo } from './product-info';
import { ProductFeatures } from './product-features';
import { AddToCartSection } from './add-to-cart-section';
import { RelatedProducts } from './related-products';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function ProductDetailsPageContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { fetchProductBySlug, fetchProductBySlugData } =
    useGetProductBySlug(slug);

  if (fetchProductBySlug.isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!fetchProductBySlugData) {
    return (
      <main className='grid min-h-screen place-items-center bg-[#F0EEDE]'>
        <div className='text-center'>
          <PackageOpen className='mx-auto size-12 text-[#004643]/40' />
          <h1 className='mt-4 text-2xl font-semibold text-[#004643]'>
            Product not found
          </h1>
          <p className='mt-2 text-sm text-[#004643]/60'>
            The product you are looking for does not exist or has been removed.
          </p>
          <Button
            className='mt-6 bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'
            size='lg'
          >
            <Link className='flex items-center gap-2' href='/shops'>
              <ArrowLeft className='size-4' />
              Back to shop
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const product = fetchProductBySlugData;
  const relatedProducts = fetchProductBySlugData.relatedProducts ?? [];
  const category = fetchProductBySlugData.category;

  return (
    <main className='min-h-screen bg-[#F0EEDE]'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <ProductImageGallery images={product.images} title={product.title} />
          <div className='flex flex-col gap-5'>
            <ProductInfo product={product} />
            <ProductFeatures product={product} category={category} />
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
