import { gql } from "urql";

export const CreateOrder = gql`
  mutation (
    $cartId: String!
    $customerInfo: CreateCustomerInput!
    $deliveryMethod: DeliveryMethods
    $paymentMethod: PaymentMethods
    $status: OrderStatus!
    $vendorId: String!
  ) {
    createOrder(
      data: {
        cartId: $cartId
        customerInfo: $customerInfo
        deliveryMethod: $deliveryMethod
        paymentMethod: $paymentMethod
        status: $status
        vendorId: $vendorId
      }
    ) {
      id
    }
  }
`;
