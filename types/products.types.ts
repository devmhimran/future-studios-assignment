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

export interface ProductDetail {
  id: number;
  sku: string;
  slug: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  currency: string;
  rating: number;
  reviewCount: number;
  stock: number;
  availabilityStatus: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  features: string[];
  relatedProductIds: number[];
  createdAt: string;
  categoryId: number;
}
