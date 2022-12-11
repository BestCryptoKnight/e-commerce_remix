export const CreateCategory = `
mutation (
  $title: String!,
  $title_ar: String!,
  $vendorId: String!,
  $active: Boolean!,
  $tagIds: [String!]!,
  $sortOrder: Int!
) {
  createCategory (data: {
    title: $title,
    title_ar: $title_ar,
    vendorId: $vendorId,
    active: $active,
    tagIds: $tagIds,
    sortOrder: $sortOrder
  }) {
    id
    title
    title_ar
    vendorId
    active
    tagIds
    sortOrder
    createdAt
    updatedAt
  }
}
`;
