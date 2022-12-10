export interface VendorsTypes {
  active: boolean;
  bank: VendorBank;
  createdAt: string;
  id: string;
  info: VendorInfo;
  name: string;
  settings: {
    deliveryMethods: DeliveryMethods;
    paymentMethods: PaymentMethods;
  };
  slug: string;
  updatedAt: string;
}

type VendorBank = {
  accountNumber: string;
  bankName: string;
  beneficiary: string;
  iban: string;
};

type VendorInfo = {
  address: string;
  addressUrl: string;
  description: string;
  description_ar: string;
  email: string;
  phone: string;
  terms: string;
};

enum DeliveryMethods {
  "MANDOOB",
  "PICKUP",
  "SMSA",
}

enum PaymentMethods {
  "BANK_TRANSFER",
  "CASH",
  "ONLINE",
  "STORE",
}

export interface UpdateVendorForm {
  name: string;
  email: string;
  address: string;
  addressUrl: string;
  contactName: string;
  phone: string;
  storeLocation: string;
  vatNumber: number;
  crNumber: number;
  deliveryMethods: string;
  paymentMethods: string;
  iban: string;
  accountNumber: string;
  beneficiary: string;
  bankName: string;
  instagram: string;
  facebook: string;
  snapchat: string;
  whatsapp: string;
  description: string;
  description_ar: string;
  terms: string;
  active: boolean;
}
