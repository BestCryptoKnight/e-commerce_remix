export interface BookingFormFields {
  title: string;
  fullName: string;
  phoneNumber: number;
  email: string;
  services: string[];
}

export type BookingFormProps = {
  defaultValues: BookingFormFields;
  onSuccess: () => void;
  id?: string | undefined;
};
