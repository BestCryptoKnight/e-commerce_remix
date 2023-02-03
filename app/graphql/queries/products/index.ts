import { gql } from "urql";

export const GetAllProducts = gql`
  query getProductsForHub(
    $sortOrder: SortOrder
    $pagination: PaginationArgs
    $filter: ProductFilterInputForHub
  ) {
    getProductsForHub(
      sortOrder: $sortOrder
      pagination: $pagination
      filter: $filter
    ) {
      totalCount
      list {
        id
        title
        title_ar
        description
        description_ar
        active
        attendanceType
        vendor {
          id
          name
        }
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

        noOfSeats
        createdAt
        updatedAt
        categoryId
      }
    }
  }
`;

export const GetFilterProducts = gql`
  query GetProducts($vendorId: String!, $filter: ProductFilterInput) {
    getProducts(vendorId: $vendorId, filter: $filter) {
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
