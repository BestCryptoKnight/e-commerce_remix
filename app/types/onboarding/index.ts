export interface StepOneFormFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  next?: void;
}
export interface OTPActions {
  code?: string;
  phone: string;
}

export interface CreateVendor {
  name: string;
  slug: string;
}
