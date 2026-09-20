import categoriesData from '@/data/categories.json';
import { jsonResponse, optionsResponse } from '@/lib';

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
  const hasPagination = searchParams.has('page') || searchParams.has('limit');

  try {
    const allCategories = categoriesData.categories.map(({ id, name, slug }) => ({
      id,
      name,
      slug,
    }));

    if (!hasPagination) {
      return jsonResponse({
        data: allCategories,
        meta: {
          page: 1,
          limit: allCategories.length,
          total: allCategories.length,
          totalPages: 1,
        },
      });
    }

    const page = parseInteger(searchParams.get('page'), 'page', 1);
    const limit = Math.min(parseInteger(searchParams.get('limit'), 'limit', 12), 100);
    const total = allCategories.length;
    const totalPages = Math.ceil(total / limit);

    if (totalPages > 0 && page > totalPages) {
      return errorResponse(`page must be between 1 and ${totalPages}`);
    }

    const start = (page - 1) * limit;
    const categories = allCategories.slice(start, start + limit);

    return jsonResponse({
      data: categories,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Invalid query parameters');
  }
}
