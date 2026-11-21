// types.ts

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string; // ISO 8601 date string
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string; // Optional because some generic items in DummyJSON omit brand
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

// Response type for GET /products, /products/search, and /products/category/:category
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Response type for GET /products/categories
export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

// Response type for DELETE /products/:id
export interface DeletedProduct extends Product {
  isDeleted: boolean;
  deletedOn: string;
}
