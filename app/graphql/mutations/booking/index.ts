import { gql } from "urql";

export const CreateBooking = gql`
  mutation (
    $cartId: String!
    $productId: String!
    $status: BookingStatus!
    $tagId: String!
    $slots: [BookingSlotInput!]!
    $vendorId: String!
  ) {
    createBooking(
      data: {
        cartId: $cartId
        productId: $productId
        status: $status
        tagId: $tagId
        slots: $slots
        vendorId: $vendorId
      }
    ) {
      id
      slots {
        from
        to
      }
    }
  }
`;
