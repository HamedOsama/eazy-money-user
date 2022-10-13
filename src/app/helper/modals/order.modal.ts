export interface OrderData {
  orderItems: [
    {
      propertyId: string;
      quantity: number;
    }
  ];
  name: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  storeName: string;
  sellPrice: number;
  newPrice: number;
  productId: string;
  shippingPrice: number;
  totalPrice: number;
  buyerId: string;
}
