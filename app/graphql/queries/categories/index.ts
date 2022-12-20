import { gql } from "urql";
export const GetCategories = gql`
  query ($vendorId: String!, $sortOrder: SortOrder) {
    getCategories(vendorId: $vendorId, sortOrder: $sortOrder) {
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
