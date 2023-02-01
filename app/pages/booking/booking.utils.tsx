import { Checkbox } from "antd";
export const bookingColumns = () => [
  {
    title: "Vendor ID",
    dataIndex: "vendorId",
    key: "vendorId",

    render: (_: any, record: any) => {
      return <p>{record?.vendor ? record?.vendor?.id : ""}</p>;
    },
    label: <Checkbox value="vendorId">Vendor ID</Checkbox>,
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
    key: "vendorName",

    render: (_: any, record: any) => {
      return <p>{record?.vendor ? record?.vendor?.name : ""}</p>;
    },
    label: <Checkbox value="vendorName">Vendor Name</Checkbox>,
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",

    render: (_: any, record: any) => {
      return <p>{record?.orderId ? record?.orderId : ""}</p>;
    },
    label: <Checkbox value="orderId">Order ID</Checkbox>,
  },
  {
    title: "Service Name",
    dataIndex: "serviceName",
    key: "serviceName",
    render: (_: any, record: any) => {
      return <p>{record?.product ? record?.product?.title : ""}</p>;
    },
    label: <Checkbox value="serviceName">Service Name</Checkbox>,
  },
  {
    title: "Service Type",
    dataIndex: "serviceType",
    key: "serviceType",

    render: (_: any, record: any) => {
      return <p>{record?.product ? record?.product?.type : ""}</p>;
    },
    label: <Checkbox value="serviceType">Service Type</Checkbox>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_: any, record: any) => {
      return <p>{record?.createdAt ? record?.createdAt : ""}</p>;
    },
    label: <Checkbox value="createdAt">Created At</Checkbox>,
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    render: (_: any, record: any) => {
      return <p>{record?.slots ? record?.slots[0]?.from : ""}</p>;
    },
    label: <Checkbox value="startTime">Start Time</Checkbox>,
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
    render: (_: any, record: any) => {
      return <p>{record?.slots ? record?.slots[0]?.to : ""}</p>;
    },
    label: <Checkbox value="endTime">End Time</Checkbox>,
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDate",
    key: "bookingDate",
    render: (_: any, record: any) => {
      return <p>{record?.createdAt ? record?.createdAt : ""}</p>;
    },
    label: <Checkbox value="bookingDate">Booking Date</Checkbox>,
  },
];
