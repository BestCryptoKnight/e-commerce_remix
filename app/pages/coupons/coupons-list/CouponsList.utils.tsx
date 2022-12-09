import type { ProductType } from "~/types/products";
import type { ColumnsType } from "antd/es/table";

export const couponTableColumns: ColumnsType<ProductType> = [
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
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    responsive: ["md", "xs"],
  },
  {
    title: "Percentage",
    dataIndex: "percentage",
    key: "percentage",
    responsive: ["md", "xs"],
  },

  {
    title: "Active",
    dataIndex: "active",
    key: "active",
    responsive: ["md", "xs"],
  },
];
