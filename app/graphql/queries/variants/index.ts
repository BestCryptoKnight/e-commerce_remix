export const GetVariants = `
query ($vendorId: String!) {
getVariants (vendorId: $vendorId) {
    id
    title
    title_ar
    options {
      sku
      image
      title
      title_ar
    }
  }
}
`;
