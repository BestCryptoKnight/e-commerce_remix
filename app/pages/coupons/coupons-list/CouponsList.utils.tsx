import { Checkbox } from "antd";
export const couponTableColumns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    responsive: ["md", "xs"],
    label: <Checkbox value="code">Code</Checkbox>,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    responsive: ["md", "xs"],
    label: <Checkbox value="percentage">Percentage</Checkbox>,
  },

  {
    title: "Active",
    dataIndex: "active",
    key: "active",
    render: (record) => {
      return <>{String(record)}</>;
    },
    responsive: ["md", "xs"],
    label: <Checkbox value="active">Active</Checkbox>,
  },
];
