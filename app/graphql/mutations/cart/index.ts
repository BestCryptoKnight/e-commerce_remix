import { gql } from "urql";

export const AddServiceToCart = gql`
  mutation (
    $productId: String!
    $vendorId: String!
    $cartId: String
    $tagId: String
    $quantity: Int
    $productVariant: String
    $slots: [BookingTimeInput!]
  ) {
    addServiceToCart(
      data: {
        productId: $productId
        vendorId: $vendorId
        cartId: $cartId
        tagId: $tagId
        quantity: $quantity
        productVariant: $productVariant
        slots: $slots
      }
    ) {
      id
    }
  }
`;
