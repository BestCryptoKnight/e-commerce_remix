export interface OrderType {}

export interface OrderStatusType {
  label: JSX.Element;
}

type CustomerInfoType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type CartType = {
  finalPrice: number;
};

type VendorType = {
  id: string;
  name: string;
};

export type RowDataType = {
  id: string;
  vendor: VendorType;
  orderId: string;
  createdAt: Date;
  status: string;
  cart: CartType;
  customerInfo: CustomerInfoType;
  paymentMethod: string;
  deliveryMethod: string;
  finalPrice: Float32Array;
};
