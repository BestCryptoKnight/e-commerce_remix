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
  $categoryId: String!,
  $type: ProductType!,
  $itemsInStock: Int,
  $minPreorderDays: Int,
  $noOfSeats: Int,
  $sortOrder: Int
  $slug: String!
) {
  createProduct (data: {
    title: $title,
    title_ar: $title_ar,
    description: $description,
    description_ar: $description_ar,
    vendorId: $vendorId,
    active: $active,
    tagIds: $tagIds,
    image: $image,
    categoryId: $categoryId,
    type: $type,
    itemsInStock: $itemsInStock,
    noOfSeats: $noOfSeats,
    minPreorderDays:$minPreorderDays,
    sortOrder: $sortOrder,
    slug: $slug,
  }) {
    id
    title
    title_ar
    description
    description_ar
    vendorId
    active
    tagIds
    image
    categoryId
    minPreorderDays
    type
    itemsInStock
    noOfSeats
    createdAt
    updatedAt
    sortOrder
    slug
  }
}
`;

export const UpdateProduct = `
mutation ($id: String!,
  $image: String!,
  $title: String!,
  $title_ar: String!,
  $description: String!,
  $description_ar: String!,
  $vendorId: String!,
  $active: Boolean!,
  $tagIds: [String!],
  $categoryId: String!,
  $type: ProductType!,
  $itemsInStock: Int,
  $minPreorderDays: Int,
  $noOfSeats: Int,
  $sortOrder: Int
  $slug: String!
) {
 updateProduct (id: $id, data: {
  title: $title,
    title_ar: $title_ar,
    description: $description,
    description_ar: $description_ar,
    vendorId: $vendorId,
    active: $active,
    tagIds: $tagIds,
    image: $image,
    categoryId: $categoryId,
    type: $type,
    itemsInStock: $itemsInStock,
    noOfSeats: $noOfSeats,
    minPreorderDays:$minPreorderDays
    sortOrder: $sortOrder
    slug: $slug,
  }) {
    id
    title
    title_ar
    description
    description_ar
    vendorId
    active
    tagIds
    image
    categoryId
    minPreorderDays
    type
    sortOrder
    itemsInStock
    noOfSeats
    createdAt
    updatedAt
    slug
  }
}
`;

export const DeleteProduct = `
mutation (
  $id: String!,
) {
  deleteProduct (id: $id) {
    id
    title
    title_ar
    active
  }
}
`;
