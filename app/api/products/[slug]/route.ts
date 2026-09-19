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

  const productsById = new Map(
    productsData.products.map((item) => [item.id, item]),
  );
  const relatedProducts = product.relatedProductIds.flatMap((id) => {
    const relatedProduct = productsById.get(id);
    return relatedProduct ? [relatedProduct] : [];
  });

  return jsonResponse({ data: product, relatedProducts });
}
