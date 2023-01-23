import { gql } from "urql";

export const GetAllProducts = gql`
  query GetAllProducts($sortOrder: SortOrder, $pagination: PaginationArgs) {
    getAllProducts(sortOrder: $sortOrder, pagination: $pagination) {
      totalCount
      list {
        id
        title
        title_ar
        description
        description_ar
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
