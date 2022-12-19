import { gql } from "urql";
export const GetCategories = gql`
  query ($vendorId: String!) {
    getCategories(vendorId: $vendorId) {
      id
      title
      title_ar
      createdAt
      updatedAt
      sortOrder
      active
    }
  }
`;
