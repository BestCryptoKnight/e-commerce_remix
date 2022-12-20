export interface BookingFormFields {
  phone: string;
  lastName: string;
  firstName: string;
  endTime: string;
  productId: string;
  title: string;
  fullName: string;
  phoneNumber: number;
  email: string;
  services: string;
  tagId: string;
  startTime: string;
  slots: any;
}

export type BookingFormProps = {
  defaultValues: BookingFormFields;
  onSuccess: () => void;
  id?: string | undefined;
};

export interface addServiceToCartPayload {}
