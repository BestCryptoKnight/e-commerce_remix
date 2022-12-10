export const CreateTag = `
mutation (
  $title: String!,
  $title_ar: String!,
  $vendorId: String!,
  $active: Boolean!,
  $availabilities: [ServiceAvailabilityInput!]
) {
  createTag (data: {
    title: $title,
    title_ar: $title_ar,
    vendorId: $vendorId,
    active: $active,
    availabilities: $availabilities
  }) {
    id
    title
    title_ar
    active
  }
}
`;
