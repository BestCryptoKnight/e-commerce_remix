import { gql } from "urql";

export const AddServiceToCart = gql`
  mutation (
    $productId: String!
    $vendorId: String!
    $cartId: String
    $tagId: String
    $quantity: Int
    $sku: String!
    $slots: [BookingSlotInput!]
  ) {
    addServiceToCart(
      data: {
        productId: $productId
        vendorId: $vendorId
        cartId: $cartId
        tagId: $tagId
        quantity: $quantity
        slots: $slots
        sku: $sku
      }
    ) {
      id
    }
  }
`;
