import type { CategoryType } from "~/types/categories";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

export const categoryTableColumns: ColumnsType<CategoryType> = [
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
    title: "Active",
    dataIndex: "active",
    key: "active",
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
