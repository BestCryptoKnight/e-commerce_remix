import { gql } from "urql";

export const GetProducts = gql`
  query GetProducts($vendorId: String!) {
    getProducts(vendorId: $vendorId) {
      list {
        id
        title
        title_ar
        description
        description_ar
        vendorId
        active
        tagIds

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
        Tags {
          id
          title
        }
      }
    }
  }
`;
