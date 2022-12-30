import { gql } from "urql";

export const GetVendorsView = gql`
  query GetVendorsView($pagination: PaginationArgs) {
    getVendorsView(pagination: $pagination) {
      totalCount
      list {
        vendorName
        vendorUrl
        numberOrders
        numberCoupons
        numberBookings
        numberProducts
        numberServices
        numberCategories
        accountManager
      }
    }
  }
`;
