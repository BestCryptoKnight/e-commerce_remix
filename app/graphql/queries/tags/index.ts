import { gql } from "urql";
export const GetTags = gql`
  query ($vendorId: String) {
    getTags(vendorId: $vendorId) {
      id
      title
      title_ar
      createdAt
      updatedAt
      active
      availabilities {
        startTime
        endTime
      }
    }
  }
`;
