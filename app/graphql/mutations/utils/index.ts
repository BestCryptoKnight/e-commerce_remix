export const UploadFile = `
mutation (
  $file: String!,
  $key: String!,
) {
uploadFile (file:$file,key:$key) 
`;
