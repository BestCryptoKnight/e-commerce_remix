import { gql } from "urql";
export const CreateCart = gql`
  mutation ($id: String!) {
    getCart(customerId: $id) {
      id
    }
  }
`;
