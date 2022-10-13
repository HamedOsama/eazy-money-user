export interface ProductResponse {
  code: number;
  data: [];
  message: string;
  ok: boolean;
}

export interface ProductData {
  image: any;
  name: string;
  category: string;
  description: string;
  price: number;
  total_amount: number;
  seller: string;
  createdAt: Date;
  numOfReviews: number;
  properties: [];
  rate: number;
  reviews: [];
  __v: number;
  _id: string;
}
