export const GetTags = `
query ($vendorId: String) {
  getTags (vendorId: $vendorId) {
    id
    title
    title_ar
    createdAt
    updatedAt
    active,
    availabilities {
      days
      startTime
      endTime
    }
  }
}
`;
