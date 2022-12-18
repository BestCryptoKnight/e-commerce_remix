import { gql } from "urql";
export const Signup = gql`
  mutation (
    $email: String!
    $firstName: String
    $lastName: String
    $password: String!
  ) {
    signup(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      accessToken
      refreshToken
      user {
        id
        role
      }
    }
  }
`;

export const SendOTP = gql`
  mutation ($phone: String!) {
    sendOtp(data: { phone: $phone }) {
      to
    }
  }
`;

export const VerifyOtp = gql`
  mutation ($phone: String!, $code: String!) {
    verifyOtp(data: { phone: $phone, code: $code }) {
      to
      status
    }
  }
`;
