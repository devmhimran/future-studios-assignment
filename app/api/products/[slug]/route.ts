import productsData from '@/data/products-500.json';
import { jsonResponse, optionsResponse } from '@/lib';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export function OPTIONS() {
  return optionsResponse();
}

export async function GET(_: Request, { params }: RouteContext) {
  const { slug } = await params;
  const product = productsData.products.find((item) => item.slug === slug);

  if (!product) {
    return jsonResponse({ error: { message: 'Product not found' } }, { status: 404 });
  }

  return jsonResponse({ data: product });
}
