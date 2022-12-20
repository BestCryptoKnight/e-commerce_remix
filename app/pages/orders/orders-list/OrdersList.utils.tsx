import { Checkbox } from "antd";
import moment from "moment";

export const orderTableColumns = (t: any) => [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    responsive: ["md", "xs"],
    label: <Checkbox value="orderId">Order ID</Checkbox>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    label: <Checkbox value="customer">Customer</Checkbox>,
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    responsive: ["md", "xs"],
    label: <Checkbox value="payment">Payment</Checkbox>,
  },
  {
    title: "Total Amount",
    dataIndex: "total",
    key: "total",
    responsive: ["md", "xs"],
    label: <Checkbox value="total">Total Amount</Checkbox>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    responsive: ["md", "xs"],
    label: <Checkbox value="status">Status</Checkbox>,
  },
  {
    title: "Created At",
    key: "createdAt",
    render(value: string) {
      return <div>{moment(value).format("DD-MM-YYYY")}</div>;
    },
    responsive: ["sm"],
    label: <Checkbox value="createdAt">Created At</Checkbox>,
  },
  {
    title: "Action",
    key: "action",
    render: () => <p className="cursor-pointer text-green">Details</p>,
    label: <Checkbox value="action">Actions</Checkbox>,
  },
];

export const orderStatusTabs = (t: any) => [
  {
    label: t("ALL_ORDERS"),
  },
  {
    label: "Pending",
  },
  {
    label: "Confirmed",
  },

  {
    label: "Rejected",
  },
  {
    label: "Completed",
  },
];
