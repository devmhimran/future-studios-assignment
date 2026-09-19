import productsData from '@/data/products-500.json';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { slug } = await params;
  const product = productsData.products.find((item) => item.slug === slug);

  if (!product) {
    return Response.json({ error: { message: 'Product not found' } }, { status: 404 });
  }

  return Response.json({ data: product });
}
