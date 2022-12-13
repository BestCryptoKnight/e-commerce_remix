import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks/Store";
import { Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { couponTableColumns } from "./CouponsList.utils";
import Drawer from "~/components/shared/drawer";
import AddNewCoupon from "../add-coupon";
import { GetCouponAction } from "~/redux/app/actions/coupon";

export default function Index() {
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetCouponAction());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mb-4"
          onClick={() => setCouponDrawerOpen(true)}
        >
          Create Coupon
        </Button>
      </div>
      <Table columns={couponTableColumns} dataSource={data} loading={loading} />
      <Drawer
        title="Add Coupon"
        size="large"
        open={couponDrawerOpen}
        onClose={() => setCouponDrawerOpen(false)}
        placement="right"
      >
        <AddNewCoupon
          selectedCoupon={null}
          setCouponDrawerOpen={setCouponDrawerOpen}
        />
      </Drawer>
    </>
  );
}
