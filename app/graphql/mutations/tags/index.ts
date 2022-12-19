import { gql } from "urql";
export const CreateTag = gql`
  mutation (
    $title: String!
    $title_ar: String!
    $vendorId: String!
    $active: Boolean!
    $workdays: [WorkDayInput!]!
  ) {
    createTag(
      data: {
        title: $title
        title_ar: $title_ar
        vendorId: $vendorId
        active: $active
        workdays: $workdays
      }
    ) {
      id
      title
      title_ar
      active
      workdays {
        day
        from
        to
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
    $workdays: [WorkDayInput!]!
  ) {
    updateTag(
      id: $id
      data: {
        title: $title
        title_ar: $title_ar
        active: $active
        workdays: $workdays
      }
    ) {
      id
      title
      title_ar
      active
      workdays {
        day
        from
        to
      }
    }
  }
`;
