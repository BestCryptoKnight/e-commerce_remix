import { useState } from "react";
import { useAppSelector } from "~/hooks/Store";
import { Table, Button, Row } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { couponTableColumns } from "./CouponsList.utils";
import CoupanFilter from "~/components/shared/filter-columns";
import Drawer from "~/components/shared/drawer";
import AddNewCoupon from "../add-coupon";

export default function Index() {
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [tableColumns, setTableColumns] = useState<any>(couponTableColumns);
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  return (
    <>
      <h2 className="text-3xl">Coupons</h2>
      <Row gutter={24} className="flex items-baseline">
        <CoupanFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
        <Button
          type="primary"
          className="mb-4"
          onClick={() => setCouponDrawerOpen(true)}
        >
          Create Coupon
        </Button>
      </Row>

      <Table
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
        dataSource={data}
        loading={loading}
      />
      <Drawer
        title="Add Coupon"
        size="large"
        open={couponDrawerOpen}
        onClose={() => setCouponDrawerOpen(false)}
        placement="right"
      >
        <AddNewCoupon
          selectedCoupon={null}
          setProductDrawerOpen={setCouponDrawerOpen}
        />
      </Drawer>
    </>
  );
}
