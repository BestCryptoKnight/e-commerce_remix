import { gql } from "urql";

export const GetVendors = gql`
  query getVendorsForHub(
    $pagination: PaginationArgs
    $filter: VendorFilterInputForHub
    $sortOrder: SortOrder
  ) {
    getVendorsForHub(
      pagination: $pagination
      filter: $filter
      sortOrder: $sortOrder
    ) {
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
