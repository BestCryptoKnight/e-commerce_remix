import { Checkbox } from "antd";
import moment from "moment";
export const productColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",

    label: <Checkbox value="title">Title </Checkbox>,
  },
  {
    title: "Arabic Title",
    dataIndex: "title_ar",
    key: "title_ar",

    label: <Checkbox value="title_ar">Arabic Title </Checkbox>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",

    label: <Checkbox value="description">Description </Checkbox>,
  },
  {
    title: "Arabic Description",
    dataIndex: "description_ar",
    key: "description_ar",

    label: <Checkbox value="description_ar">Arabic Description </Checkbox>,
  },

  {
    title: "Image",
    dataIndex: "image",
    key: "image",

    label: <Checkbox value="image">Image</Checkbox>,
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
