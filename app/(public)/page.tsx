import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { productAPI, categoriesAPI } from '@/api';
import { generateQueryString } from '@/lib/utils';
import { HomepageContent } from '@/components/pages/home';

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  rating?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = params.page ? Number(params.page) : 1;
  const categorySlug = params.category || '';
  const search = params.search || '';
  const sort = params.sort || '';

  let categoryName = '';
  if (categorySlug) {
    try {
      const res = await categoriesAPI.getCategories();
      const categories = res.data?.data || [];
      const currentCat = categories.find((cat) => cat.slug === categorySlug);
      if (currentCat) categoryName = currentCat.name;
    } catch {
      // ignore
    }
  }

  const baseTitle = categoryName
    ? `${categoryName} Collection`
    : 'Discover Your Next Favorite Thing';

  const title =
    currentPage > 1
      ? `${baseTitle} | Page ${currentPage} | Future Store`
      : `${baseTitle} | Future Store`;

  const description = categoryName
    ? `Browse our ${categoryName.toLowerCase()} selection. Find the best products at Future Store.`
    : 'Discover our premium selection of products. Shop the latest collection at Future Store.';

  const urlParams = new URLSearchParams();
  if (categorySlug) urlParams.append('category', categorySlug);
  if (sort) urlParams.append('sort', sort);
  if (search) urlParams.append('search', search);
  if (currentPage > 1) urlParams.append('page', currentPage.toString());

  const canonicalUrl = urlParams.toString()
    ? `${BASE_URL}?${urlParams.toString()}`
    : BASE_URL;

  return {
    title,
    description,
    keywords: [
      'future store',
      'shop',
      'collection',
      ...(categoryName ? [categoryName.toLowerCase()] : []),
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
          url: `${BASE_URL}/og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og.jpg`],
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

async function createPageJsonLd(params: SearchParams) {
  const currentPage = params.page ? Number(params.page) : 1;
  const categorySlug = params.category || '';
  const search = params.search || '';

  let products: Array<{
    title: string;
    description: string;
    slug: string;
    price: number;
    availabilityStatus: string;
  }> = [];

  try {
    const queryParams = {
      page: currentPage.toString(),
      search,
      category: categorySlug,
      rating: params.rating || '',
      minPrice: params.minPrice || '',
      maxPrice: params.maxPrice || '',
      sort: params.sort || 'featured',
    };
    const queryString = generateQueryString(queryParams);
    const response = await productAPI.getProducts(queryString);
    products = response.data?.data || [];
  } catch {
    // ignore
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}#website`,
        url: BASE_URL,
        name: 'Future Store',
        description: 'Discover your next favorite thing.',
      },
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}#webpage`,
        url: BASE_URL,
        name: 'Future Store - Product Collection',
        description: 'Browse our premium selection of products.',
        isPartOf: { '@id': `${BASE_URL}#website` },
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}#products`,
        numberOfItems: products.length,
        itemListElement: products.map((item, index) => ({
          '@type': 'Product',
          position: index + 1,
          name: item.title,
          description: item.description,
          url: `${BASE_URL}/shops/${item.slug}`,
          offers: {
            '@type': 'Offer',
            price: item.price || '0',
            priceCurrency: 'USD',
            availability:
              item.availabilityStatus === 'In Stock'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          },
        })),
      },
    ],
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams = {
    page: params.page || '1',
    search: params.search || '',
    category: params.category || '',
    rating: params.rating || '',
    minPrice: params.minPrice || '',
    maxPrice: params.maxPrice || '',
    sort: params.sort || 'featured',
  };

  const queryString = generateQueryString(queryParams);
  const queryClient = getQueryClient();

  await queryClient.query({
    queryKey: ['products', queryString],
    queryFn: () => productAPI.getProducts(queryString).then((res) => res.data),
  });

  await queryClient.query({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getCategories().then((res) => res.data),
  });

  const jsonLd = await createPageJsonLd(params);

  return (
    <>
      <script
        id='page-json-ld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomepageContent />
      </HydrationBoundary>
    </>
  );
}
