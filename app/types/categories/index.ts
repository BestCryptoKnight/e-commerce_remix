import type { TagsTypes } from "../tags";
import type { VendorsTypes } from "../vendors";
export interface CategoryType {
  Tags: TagsTypes;
  Vendor: VendorsTypes;
  active: boolean;
  createdAt: string;
  id: string;
  sortOrder: number;
  tags: string[];
  title: string;
  title_ar: string;
  updatedAt: string;
  vendorId: string;
}
