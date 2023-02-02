import { gql } from "urql";
export const GetAllBookings = gql`
  query GetAllBookings($pagination: PaginationArgs) {
    getAllBookings(pagination: $pagination) {
      list {
        vendor {
          id
          name
        }
        product {
          type
          title
        }
        orderId
        slots {
          from
          to
        }
        createdAt
      }
      totalCount
    }
  }
`;
