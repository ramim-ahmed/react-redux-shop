type TReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
type TMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
type TDimension = {
  width: number;
  height: number;
  depth: number;
};

type genericArray<T> = Array<T>;

export type TProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: genericArray<string>;
  brand: string;
  sku: string;
  weight: number;
  dimensions: TDimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: genericArray<TReview>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: TMeta;
  images: genericArray<string>;
  thumbnail: string;
};

export type TProductApiResponse = {
  products: genericArray<TProduct>;
  total: number;
  skip: number;
  limit: number;
};

export type TProductTableProps = {
  products: TProduct[];
};
