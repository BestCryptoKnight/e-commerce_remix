import { gql } from "urql";
export const CreateCategory = gql`
  mutation (
    $title: String!
    $title_ar: String!
    $vendorId: String!
    $active: Boolean!
    $sortOrder: Int!
  ) {
    createCategory(
      data: {
        title: $title
        title_ar: $title_ar
        vendorId: $vendorId
        active: $active
        sortOrder: $sortOrder
      }
    ) {
      id
      title
      title_ar
      vendorId
      active
      sortOrder
      createdAt
      updatedAt
    }
  }
`;

export const UpdateCategory = gql`
  mutation (
    $id: String!
    $title: String!
    $title_ar: String!
    $active: Boolean!
    $sortOrder: Int
  ) {
    updateCategory(
      id: $id
      data: {
        title: $title
        title_ar: $title_ar
        active: $active
        sortOrder: $sortOrder
      }
    ) {
      id
      title
      title_ar
      active
      sortOrder
      createdAt
      updatedAt
    }
  }
`;

export const DeleteCategory = gql`
  mutation ($id: String!) {
    deleteCategory(id: $id) {
      id
      title
      title_ar
      active
    }
  }
`;
