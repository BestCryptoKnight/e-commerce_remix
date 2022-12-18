import { gql } from "urql";
export const UploadFile = gql`
  mutation ($file: String!, $key: String!) {
    uploadFile(file: $file, key: $key)
  }
`;
