export const Signup = `
mutation (
  $email: String!,
  $firstName: String,
  $lastName: String,
  $password: String!
) {
  signup (data: {
    email: $email,
    firstName: $firstName,
    lastName: $lastName,
    password: $password,
  }) {
   accessToken
   refreshToken
   user {
    id
    role
   }
  }

}
`;

export const SendOTP = `
mutation (
  $phone: String!,
) {
  sendOtp (data: {
    phone: $phone,
  }) {
  to
  }
}
`;

export const VerifyOtp = `
mutation (
  $phone: String!,
  $code: String!,

) {
  verifyOtp (data: {
    phone: $phone,
    code: $code,
  }) {
  to
  status
  }
}
`;
