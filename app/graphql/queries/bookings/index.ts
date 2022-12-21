import { gql } from "urql";
export const GetBookings = gql`
  query ($vendorId: String!) {
    getBookings(vendorId: $vendorId) {
      id
      slots {
        from
        to
      }
    }
  }
`;
