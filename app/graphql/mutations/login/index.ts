export const Login = `
mutation (
  $email: String!,
  $password: String!
) {
  login (data: {
    email: $email,
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
