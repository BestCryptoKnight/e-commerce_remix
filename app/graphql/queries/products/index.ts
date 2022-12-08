import { gql } from "urql";

export const GetProducts = gql`
  query Dog($categoryId: String!, $vendorId: String!) {
    getProducts(categoryId: $categoryId, vendorId: $vendorId) {
      list {
        id
        image
      }
    }
  }
`;
