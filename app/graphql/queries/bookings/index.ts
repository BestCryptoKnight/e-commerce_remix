import { gql } from "urql";
export const GetAllBookings = gql`
  query GetAllBookings($sortOrder: SortOrder, $pagination: PaginationArgs) {
    getAllBookings(sortOrder: $sortOrder, pagination: $pagination) {
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
