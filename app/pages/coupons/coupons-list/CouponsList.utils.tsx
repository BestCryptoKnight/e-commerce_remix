import { Checkbox } from "antd";
export const couponTableColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
    label: <Checkbox value="title">Title</Checkbox>,
  },
  {
    title: "Arabic Title",
    dataIndex: "title_ar",
    key: "title_ar",
    responsive: ["md", "xs"],
    label: <Checkbox value="title_ar">Arabic Title</Checkbox>,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    responsive: ["md", "xs"],
    label: <Checkbox value="code">Code</Checkbox>,
  },
  {
    title: "Percentage",
    dataIndex: "percentage",
    key: "percentage",
    responsive: ["md", "xs"],
    label: <Checkbox value="percentage">Percentage</Checkbox>,
  },

  {
    title: "Active",
    dataIndex: "active",
    key: "active",
    responsive: ["md", "xs"],
    label: <Checkbox value="active">Active</Checkbox>,
  },
];
