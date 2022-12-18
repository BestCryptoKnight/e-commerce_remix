import { gql } from "urql";

//Get or create a new cart
export const GetCustomerCart = gql`
  query ($customerId: String!) {
    getCustomerCart(customerId: $customerId) {
      id
    }
  }
`;
