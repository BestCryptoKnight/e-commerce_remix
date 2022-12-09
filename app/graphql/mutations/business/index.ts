export const UpdateVendor = `
mutation (
  $active: Boolean,
  $bank: UpdateVendorBankInput,
  $info: UpdateVendorInfoInput,
  $name: String,
  $settings: UpdateVendorSettingsInput
  $id:String!
) {
updateVendor (data: {
    active: $active,
    bank:  $bank,
    info: $info,
    name: $name,
    settings: $settings,
  },id:$id) {
    active
   
  }

}
`;
