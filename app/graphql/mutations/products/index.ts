import { gql } from "urql";
export const CreateProduct = gql`
  mutation (
    $image: String!
    $title: String!
    $title_ar: String!
    $description: String!
    $description_ar: String!
    $vendorId: String!
    $active: Boolean!
    $tags: [String!]
    $categoryId: String!
    $type: ProductType!
    $itemsInStock: Int
    $variants: [VariantInput!]
    $minPreorderDays: Int
    $noOfSeats: Int
    $sortOrder: Int
    $slug: String!
  ) {
    createProduct(
      data: {
        title: $title
        title_ar: $title_ar
        description: $description
        description_ar: $description_ar
        vendorId: $vendorId
        active: $active
        tags: $tags
        image: $image
        categoryId: $categoryId
        type: $type
        itemsInStock: $itemsInStock
        variants: $variants
        noOfSeats: $noOfSeats
        minPreorderDays: $minPreorderDays
        sortOrder: $sortOrder
        slug: $slug
      }
    ) {
      id
      title
      title_ar
      description
      description_ar
      vendorId
      active
      tags {
        id
      }
      image
      categoryId
      minPreorderDays
      type
      variants {
        title
        title_ar
        price
        sku
      }
      itemsInStock
      noOfSeats
      createdAt
      updatedAt
      sortOrder
      slug
    }
  }
`;

export const UpdateProduct = gql`
  mutation (
    $id: String!
    $image: String!
    $title: String!
    $title_ar: String!
    $description: String!
    $description_ar: String!
    $active: Boolean!
    $tags: [String!]
    $categoryId: String!
    $type: ProductType!
    $itemsInStock: Int
    $minPreorderDays: Int
    $noOfSeats: Int
    $sortOrder: Int
    $slug: String!
  ) {
    updateProduct(
      id: $id
      data: {
        title: $title
        title_ar: $title_ar
        description: $description
        description_ar: $description_ar
        active: $active
        tags: $tags
        image: $image
        categoryId: $categoryId
        type: $type
        itemsInStock: $itemsInStock
        noOfSeats: $noOfSeats
        minPreorderDays: $minPreorderDays
        sortOrder: $sortOrder
        slug: $slug
      }
    ) {
      id
      title
      title_ar
      description
      description_ar
      active
      tags {
        id
      }
      image
      categoryId
      minPreorderDays
      type
      sortOrder
      itemsInStock
      noOfSeats
      createdAt
      updatedAt
      slug
    }
  }
`;

export const DeleteProduct = gql`
  mutation ($id: String!) {
    deleteProduct(id: $id) {
      id
      title
      title_ar
      active
    }
  }
`;
