import { gql } from "urql";
export const CreateCoupon = gql`
  mutation (
    $discount: Float!
    $code: String!
    $vendorId: String!
    $active: Boolean!
  ) {
    createCoupon(
      data: {
        vendorId: $vendorId
        active: $active
        code: $code
        discount: $discount
      }
    ) {
      active
      code
      createdAt
      discount
      id
      updatedAt
      vendorId
    }
  }
`;
