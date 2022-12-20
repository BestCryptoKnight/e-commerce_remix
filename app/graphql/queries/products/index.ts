import { gql } from "urql";

export const GetProducts = gql`
  query GetProducts(
    $vendorId: String!
    $sortOrder: SortOrder
    $pagination: PaginationArgs
  ) {
    getProducts(
      vendorId: $vendorId
      sortOrder: $sortOrder
      pagination: $pagination
    ) {
      totalCount
      list {
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
        variants {
          title
          title_ar
          price
          sku
        }
        image
        minPreorderDays
        type
        itemsInStock
        noOfSeats
        createdAt
        updatedAt
        categoryId
      }
    }
  }
`;

export const GetFilterProducts = gql`
  query GetProducts($vendorId: String!, $type: ProductType, $field: String!) {
    getProducts(vendorId: $vendorId, filter: { type: $type, field: $field }) {
      list {
        id
        title
        title_ar
        vendor {
          id
        }
        tags {
          id
          title
        }
      }
    }
  }
`;
