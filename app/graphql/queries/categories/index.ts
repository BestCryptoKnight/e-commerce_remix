export const GetCategories = `
query ($vendorId: String!) {
    getCategories (vendorId: $vendorId) {
    id
    title
    title_ar
    createdAt
    updatedAt
    sortOrder
    active
    tagIds
  }
}
`;
