import type { CouponType } from "~/types/coupons";
import type { ColumnsType } from "antd/es/table";

export const couponTableColumns: ColumnsType<CouponType> = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    responsive: ["md", "xs"],
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    responsive: ["md", "xs"],
  },

  {
    title: "Active",
    dataIndex: "active",
    key: "active",
    render: (record) => {
      return <>{String(record)}</>;
    },
    responsive: ["md", "xs"],
  },
];
