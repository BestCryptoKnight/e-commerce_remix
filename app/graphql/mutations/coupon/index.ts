export const CreateCoupon = `
mutation (
  $title: String!,
  $code: String!,
  $vendorId: String!,
  $active: Boolean!,
) {
  createCoupon (data: {
    title: $title,
    title_ar: $title_ar,
    vendorId: $vendorId,
    active: $active,
    code: $code

  }) {
    id
    title
    title_ar
    vendorId
    code
    active 
  }
}
`;
