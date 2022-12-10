export interface BookingFormFields {
  name: string;
  email: string;
  contact_name: string;
  contact_phone_number: string;
  business_phone_number: string;
  store_location: string;
  vat_number: string;
  cr_number: string;
}

export type BookingFormProps = {
  defaultValues: BookingFormFields;
  onSuccess: () => void;
  id?: string | undefined;
};
