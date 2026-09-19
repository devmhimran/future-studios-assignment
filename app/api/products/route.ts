import categoriesData from '@/data/categories.json';
import productsData from '@/data/products-500.json';
import { jsonResponse, optionsResponse } from '@/lib';

const sortOptions = [
  'featured',
  'price-asc',
  'price-desc',
  'rating-desc',
  'newest',
] as const;

type SortOption = (typeof sortOptions)[number];

function parseNumber(value: string | null, name: string, minimum = 0) {
  if (value === null || value === '') return undefined;

  const number = Number(value);

  if (!Number.isFinite(number) || number < minimum) {
    throw new Error(
      `${name} must be a number greater than or equal to ${minimum}`,
    );
  }

  return number;
}

function parseInteger(value: string | null, name: string, fallback: number) {
  if (value === null || value === '') return fallback;

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${name} must be a positive integer`);
  }

  return number;
}

function errorResponse(message: string) {
  return jsonResponse({ error: { message } }, { status: 400 });
}

export function OPTIONS() {
  return optionsResponse();
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const search = searchParams.get('search')?.trim().toLowerCase() ?? '';
    const category = searchParams.get('category')?.trim().toLowerCase();
    const rating = parseNumber(searchParams.get('rating'), 'rating');
    const minPrice = parseNumber(searchParams.get('minPrice'), 'minPrice');
    const maxPrice = parseNumber(searchParams.get('maxPrice'), 'maxPrice');
    const page = parseInteger(searchParams.get('page'), 'page', 1);
    const limit = Math.min(
      parseInteger(searchParams.get('limit'), 'limit', 16),
      100,
    );
    const sort = (searchParams.get('sort') ?? 'featured') as SortOption;

    if (!sortOptions.includes(sort)) {
      return errorResponse(`sort must be one of: ${sortOptions.join(', ')}`);
    }

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      return errorResponse('minPrice cannot be greater than maxPrice');
    }

    const categoryId = category
      ? categoriesData.categories.find((item) => item.slug === category)?.id
      : undefined;

    if (category && categoryId === undefined) {
      return errorResponse('category must be a valid category slug');
    }

    const filteredProducts = productsData.products
      .filter((product) => {
        if (!search) return true;

        return [
          product.title,
          product.brand,
          product.description,
          ...product.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search);
      })
      .filter(
        (product) =>
          categoryId === undefined || product.categoryId === categoryId,
      )
      .filter((product) => rating === undefined || product.rating >= rating)
      .filter((product) => minPrice === undefined || product.price >= minPrice)
      .filter((product) => maxPrice === undefined || product.price <= maxPrice);

    const sortedProducts = [...filteredProducts].sort((first, second) => {
      if (sort === 'price-asc') return first.price - second.price;
      if (sort === 'price-desc') return second.price - first.price;
      if (sort === 'rating-desc') return second.rating - first.rating;
      if (sort === 'newest')
        return second.createdAt.localeCompare(first.createdAt);
      return first.id - second.id;
    });

    const total = sortedProducts.length;
    const totalPages = Math.ceil(total / limit);

    if (totalPages > 0 && page > totalPages) {
      return errorResponse(`page must be between 1 and ${totalPages}`);
    }

    const start = (page - 1) * limit;
    const products = sortedProducts
      .slice(start, start + limit)
      .map(
        ({
          slug,
          title,
          brand,
          description,
          price,
          originalPrice,
          rating: productRating,
          reviewCount,
          availabilityStatus,
          thumbnail,
        }) => ({
          slug,
          title,
          brand,
          description,
          price,
          originalPrice,
          rating: productRating,
          reviewCount,
          availabilityStatus,
          thumbnail,
        }),
      );

    return jsonResponse({
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : 'Invalid query parameters',
    );
  }
}
