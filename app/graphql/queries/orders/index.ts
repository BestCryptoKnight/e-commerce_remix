import { gql } from "urql";
export const GetOrders = gql`
  query (
    $vendorId: String!
    $sortOrder: SortOrder
    $pagination: PaginationArgs
  ) {
    getOrders(
      vendorId: $vendorId
      sortOrder: $sortOrder
      pagination: $pagination
    ) {
      id
      createdAt
      orderId
      customerInfo {
        firstName
        lastName
        phone
      }
      deliveryMethod
      paymentMethod
      status
    }
  }
`;

export const GetOrder = gql`
  query ($id: String!) {
    getOrder(id: $id) {
      id
      createdAt
      orderId
      cart {
        createdAt
        finalPrice
        items {
          productId
          productVariant
          quantity
          slots {
            from
            to
          }
          tagId
          Product {
            category {
              title
              title_ar
            }
            duration
            image
            location
            meetingLink
            title
            title_ar
            workshopBookedCount
            title
            title_ar
            type
            tags {
              title
              title_ar
            }
            image
            location
          }
        }
        totalPrice
        updatedAt
      }
      customerInfo {
        firstName
        lastName
        phone
        email
      }
      deliveryMethod
      paymentMethod
      status
    }
  }
`;
