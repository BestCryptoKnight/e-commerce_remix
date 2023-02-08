import { gql } from "urql";
export const Login = gql`
  mutation ($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        createdAt
        email
        firstName
        id
        lastName
        phone
        role
        updatedAt
        vendor {
          id
        }
        verified
      }
    }
  }
`;
