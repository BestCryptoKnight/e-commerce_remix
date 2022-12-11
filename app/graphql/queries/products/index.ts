import { gql } from "urql";

export const GetProducts = gql`
  query Dog($vendorId: String!) {
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
        price
        image
        minPreorderDays
        type
        itemsInStock
        noOfSeats
        createdAt
        updatedAt
        categoryId
        sku
      }
    }
  }
`;
