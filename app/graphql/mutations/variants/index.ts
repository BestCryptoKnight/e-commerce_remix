export const CreateVariant = `
mutation (
  $title: String!,
  $title_ar: String!,
  $options: [VariantOptionsInput!]
  $identifier: String!
) {
createVariant (data: {
    title: $title,
    title_ar: $title_ar,
    options: $options,
    identifier: $identifier
  }) {
    id
    title
    title_ar
  }
}
`;
