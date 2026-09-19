export interface Product {
  slug: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  availabilityStatus: string;
  thumbnail: string;
}

export interface ProductDetail extends Product {
  id: number;
  sku: string;
  discountPercentage: number;
  currency: string;
  stock: number;
  images: string[];
  tags: string[];
  features: string[];
  relatedProductIds: number[];
  createdAt: string;
  categoryId: number;
}

export interface ProductDetailResponse {
  data: ProductDetail;
  relatedProducts: ProductDetail[];
}
