import { gql } from "urql";

export const GetCoupons = gql`
  query getCoupons($vendorId: String!) {
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
