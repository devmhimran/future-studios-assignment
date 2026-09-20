import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { productAPI } from '@/api';
import { ProductDetailsPageContent } from '@/components/pages/product-details';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let product: {
    title: string;
    description: string;
    price: number;
    images: string[];
    brand: string;
    rating: number;
    reviewCount: number;
    availabilityStatus: string;
    category?: { name: string };
  } | null = null;

  try {
    const res = await productAPI.getProductBySlug(slug);
    product = res.data || null;
  } catch {
    // ignore
  }

  if (!product) {
    return { title: 'Product Not Found | Future Store' };
  }

  const title = `${product.title} | Future Store`;
  const description = product.description.slice(0, 160);
  const canonicalUrl = `${BASE_URL}/shops/${slug}`;
  const imageUrl = product.images?.[0] || `${BASE_URL}/og.jpg`;

  return {
    title,
    description,
    keywords: [
      product.title.toLowerCase(),
      product.brand.toLowerCase(),
      'future store',
      ...(product.category ? [product.category.name.toLowerCase()] : []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Future Store',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

async function createProductJsonLd(slug: string) {
  let product: {
    title: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    brand: string;
    rating: number;
    reviewCount: number;
    availabilityStatus: string;
    sku: string;
    category?: { name: string };
  } | null = null;

  try {
    const res = await productAPI.getProductBySlug(slug);
    product = res.data || null;
  } catch {
    // ignore
  }

  if (!product) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images || [],
    sku: product.sku || undefined,
    brand: product.brand
      ? { '@type': 'Brand', name: product.brand }
      : undefined,
    category: product.category?.name || undefined,
    offers: {
      '@type': 'Offer',
      price: product.price || '0',
      priceCurrency: product.currency || 'USD',
      availability:
        product.availabilityStatus === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/shops/${slug}`,
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };
}

export default async function ShopProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', slug],
    queryFn: () =>
      productAPI.getProductBySlug(slug).then((res) => res.data),
  });

  const jsonLd = await createProductJsonLd(slug);

  return (
    <>
      {jsonLd && (
        <script
          id='product-json-ld'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsPageContent />
      </HydrationBoundary>
    </>
  );
}
