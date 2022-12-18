import { gql } from "urql";
export const CreateTag = gql`
  mutation (
    $title: String!
    $title_ar: String!
    $vendorId: String!
    $active: Boolean!
    $availabilities: [ServiceAvailabilityInput!]
  ) {
    createTag(
      data: {
        title: $title
        title_ar: $title_ar
        vendorId: $vendorId
        active: $active
        availabilities: $availabilities
      }
    ) {
      id
      title
      title_ar
      active
      availabilities {
        startTime
        endTime
      }
    }
  }
`;

export const DeleteTag = gql`
  mutation ($id: String!) {
    deleteTag(id: $id) {
      id
      title
      title_ar
      active
    }
  }
`;

export const UpdateTag = gql`
  mutation (
    $id: String!
    $title: String!
    $title_ar: String!
    $active: Boolean!
    $availabilities: [ServiceAvailabilityInput!]
  ) {
    updateTag(
      id: $id
      data: {
        title: $title
        title_ar: $title_ar
        active: $active
        availabilities: $availabilities
      }
    ) {
      id
      title
      title_ar
      active
      availabilities {
        days
        startTime
        endTime
      }
    }
  }
`;
