import { Checkbox } from "antd";
import moment from "moment";
export const categoriesColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    responsive: ["md", "xs"],
    label: <Checkbox value="title">Title </Checkbox>,
  },
  {
    title: "Arabic Title",
    dataIndex: "title_ar",
    key: "title_ar",
    responsive: ["md", "xs"],
    label: <Checkbox value="title_ar">Arabic Title </Checkbox>,
  },

  {
    title: "Created At",
    render(value: string) {
      return <div>{moment(value).format("DD-MM-YYYY")}</div>;
    },

    key: "createdAt",
    label: <Checkbox value="createdAt">Created At</Checkbox>,
  },
];
