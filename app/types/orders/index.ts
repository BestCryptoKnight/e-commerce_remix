export interface OrderType {}

export interface OrderStatusType {
  label: JSX.Element;
}

type CustomerInfoType = {
  firstName: string;
  lastName: string;
};

type CartType = {
  finalPrice: number;
};

export type RowDataType = {
  id: string;
  status: string;
  cart: CartType;
  customerInfo: CustomerInfoType;
  paymentMethod: string;
  deliveryMethod: string;
};
