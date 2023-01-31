import { gql } from "urql";

export const GetVendors = gql`
  query getVendorsForHub(
    $pagination: PaginationArgs
    $filter: VendorFilterInputForHub
  ) {
    getVendorsForHub(pagination: $pagination, filter: $filter) {
      list {
        name
        name_ar
        slug
        createdAt
        owner {
          email
          firstName
          lastName
          role
          phone
        }
      }
      totalCount
    }
  }
`;
