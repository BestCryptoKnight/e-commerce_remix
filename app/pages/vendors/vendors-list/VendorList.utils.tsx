import { Checkbox } from "antd";
import moment from "moment";
export const productColumns = [
    {
        title: "Created At",
        render(value: string) {
            return <div>{moment(value).format("DD-MM-YYYY")}</div>;
        },

        key: "createdAt",
        label: <Checkbox value="createdAt">Created At</Checkbox>,
    },
];
