import type { availabilities } from "../products";
import type { VendorsTypes } from "../vendors";
export interface TagsTypes {
  active: boolean;
  availabilities: availabilities;
  categoryId: string;
  createdAt: string;
  id: string;
  title: string;
  title_ar: string;
  updatedAt: string;
  vendor: VendorsTypes;
  vendorId: VendorsTypes;
}
