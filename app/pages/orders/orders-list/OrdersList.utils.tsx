import type { OrderType, OrderStatusType } from "~/types/orders";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

export const orderTableColumns: ColumnsType<OrderType> = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    responsive: ["md", "xs"],
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    responsive: ["md", "xs"],
  },
  {
    title: "Total Amount",
    dataIndex: "total",
    key: "total",
    responsive: ["md", "xs"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    responsive: ["md", "xs"],
  },
  {
    title: "Created At",
    render(value: string) {
      return <div>{moment(value).format("DD-MM-YYYY")}</div>;
    },
    responsive: ["sm"],
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <p className="cursor-pointer text-green">Details</p>,
  },
];

export const orderStatusTabs: OrderStatusType[] = [
  {
    label: "All Orders",
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
