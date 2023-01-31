import { Checkbox } from "antd";
export const vendorColumns = [
  {
    title: "Vendor Name",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: any) => {
      return <p>{record?.name ? record?.name : ""}</p>;
    },
    label: <Checkbox value="name">Vendor Name</Checkbox>,
  },
  {
    title: "Arabic Name",
    dataIndex: "name_ar",
    key: "name_ar",
    render: (_: any, record: any) => {
      return <p>{record?.name_ar ? record?.name_ar : ""}</p>;
    },
    label: <Checkbox value="name_ar">Arabic Name</Checkbox>,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    render: (_: any, record: any) => {
      return <p>{record?.slug ? record?.slug : ""}</p>;
    },
    label: <Checkbox value="slug">Slug</Checkbox>,
  },
];
