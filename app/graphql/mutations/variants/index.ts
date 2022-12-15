export const CreateVariant = `
mutation (
  $title: String!,
  $title_ar: String!,
  $options: [VariantOptionsInput!]
  $vendorId: String!
) {
createVariant (data: {
    title: $title,
    title_ar: $title_ar,
    options: $options,
    vendorId: $vendorId
  }) {
    id
    title
    title_ar
  }
}
`;
