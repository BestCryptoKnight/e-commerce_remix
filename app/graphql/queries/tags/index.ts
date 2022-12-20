import { gql } from "urql";
export const GetTags = gql`
  query ($vendorId: String, $sortOrder: SortOrder) {
    getTags(vendorId: $vendorId, sortOrder: $sortOrder) {
      id
      title
      title_ar
      createdAt
      updatedAt
      active

      workdays {
        day
        from
        to
      }
    }
  }
`;
