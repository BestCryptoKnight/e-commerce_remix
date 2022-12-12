import type { OrderType, OrderStatusType } from "~/types/orders";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

export const cartProductTableColumns: ColumnsType<OrderType> = [
  {
    title: "Product",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    responsive: ["md", "xs"],
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    responsive: ["md", "xs"],
  },
];

export const cartServiceTableColumns: ColumnsType<OrderType> = [
  {
    title: "Service",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
  },
  {
    title: "Booking",
    dataIndex: "booking",
    key: "booking",
    responsive: ["md", "xs"],
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    responsive: ["md", "xs"],
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    responsive: ["md", "xs"],
  },
];

export const cartWorkshopTableColumns: ColumnsType<OrderType> = [
  {
    title: "Workshop",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
  },
  {
    title: "Seat No.",
    dataIndex: "maxSeat",
    key: "maxSeat",
    responsive: ["md", "xs"],
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    responsive: ["md", "xs"],
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    responsive: ["md", "xs"],
  },
];
