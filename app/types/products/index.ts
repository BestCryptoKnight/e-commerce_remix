import type { CategoryType } from "../categories";
import type { VariantTypes } from "../variants";
import type { VendorsTypes } from "../vendors";
export interface ProductType {
  Tags: string[];
  active: boolean;
  attendanceType: attendanceType;
  availabilities: availabilities;
  category: CategoryType;
  categoryId: string;
  createdAt: string;
  customerLocation: boolean;
  description: string;
  description_ar: string;
  duration: number;
  endDate: string;
  endTime: boolean;
  id: string;
  image: string;
  itemsInStock: number;
  location: string;
  meetingLink: string;
  minPreorderDays: number;
  noOfSeats: number;
  price: number;
  sku: string;
  sortOrder: number;
  startDate: string;
  tags: string[];
  title: string;
  title_ar: string;
  type: ProductTypeEnum;
  updatedAt: string;
  variants: VariantTypes;
  variationOptions: variationOptions;
  vendor: VendorsTypes;
  vendorId: VendorsTypes;
}

enum attendanceType {
  "ONLINE",
  "PHYSICAL",
}

export enum ProductTypeEnum {
  "PRODUCT",
  "SERVICE",
  "WORKSHOP",
}

export type availabilities = {
  days: string;
  endTime: string;
  startTime: string;
};

type variationOptions = {
  key: string;
  key_ar: string;
  values: { value: string; value_ar: string };
};

export interface ServiceFieldsProps {
  attendanceType: string;
  selectedLocation: { location: string; field: string };
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ location: string; field: string }>
  >;
}

export interface ProductDetailsFieldsTypes {
  selectedProduct: any;
}
