import type { CouponType } from "~/types/coupons";
import type { ColumnsType } from "antd/es/table";

export const tagsTableColumns: ColumnsType<CouponType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
  },
  {
    title: "Arabic Title",
    dataIndex: "title_ar",
    key: "title_ar",
    responsive: ["md", "xs"],
  },
];
