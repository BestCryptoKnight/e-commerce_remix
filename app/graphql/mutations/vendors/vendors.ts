export const CreateVendor = `
mutation (
  $name: String!,
  $slug: String!,
) {
  createVendor (data: {
    name: $name,
    slug: $slug,
  }) {
  id
  active
  }
}
`;
