import { gql } from "urql";

export const CreateBooking = gql`
  mutation (
    $cartId: String!
    $productId: String!
    $status: BookingStatus!
    $tagId: String!
    $times: [BookingTimeInput!]!
    $vendorId: String!
  ) {
    createBooking(
      data: {
        cartId: $cartId
        productId: $productId
        status: $status
        tagId: $tagId
        times: $times
        vendorId: $vendorId
      }
    ) {
      id
    }
  }
`;
