import { gql } from "urql";

export const GetCoupons = gql`
  query Dog($vendorId: String!) {
    getCoupons(vendorId: $vendorId) {
      id
      code
      discount
      createdAt
      updatedAt
      active
    }
  }
`;
