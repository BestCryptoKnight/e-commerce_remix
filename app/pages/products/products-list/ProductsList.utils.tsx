import type { ProductType } from "~/types/products";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

export const productTableColumns: ColumnsType<ProductType> = [
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    responsive: ["md", "xs"],
  },
  {
    title: "Arabic Description",
    dataIndex: "description_ar",
    key: "description_ar",
    responsive: ["md", "xs"],
  },

  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    responsive: ["md", "xs"],
  },
  {
    title: "Created At",
    render(value: string) {
      return <div>{moment(value).format("DD-MM-YYYY")}</div>;
    },
    responsive: ["sm"],
  },
];
