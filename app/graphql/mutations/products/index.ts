export const CreateProduct = `
mutation (
  $image: String!,
  $title: String!,
  $title_ar: String!,
  $description: String!,
  $description_ar: String!,
  $vendorId: String!,
  $active: Boolean!,
  $tagIds: [String!],
  $price: Float!,
  $categoryId: String!
  $type: String!,
  $itemsInStock: Int,
  $attributes: [ProductAttributeInput!],
  $noOfSeats: Int
  $sku: String,
) {
  createProduct (data: {
    title: $title,
    title_ar: $title_ar,
    description: $description,
    description_ar: $description_ar,
    vendorId: $vendorId,
    active: $active,
    tagIds: $tagIds,
    price: $price,
    image: $image,
    categoryId: $categoryId,
    minPreorderDays: $minPreorderDays,
    type: $type,
    itemsInStock: $itemsInStock,
    attributes: $attributes,
    noOfSeats: $noOfSeats,
    sku: $sku,
  }) {
    id
    title
    title_ar
    description
    description_ar
    vendorId
    active
    tagIds
    price
    image
    categoryId
    minPreorderDays
    type
    itemsInStock
    noOfSeats
    createdAt
    updatedAt
  }
}
`;
