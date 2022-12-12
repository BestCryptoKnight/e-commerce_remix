import { useEffect, useState } from "react";
import { GetCategoriesAction } from "~/redux/app/actions/category";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Tabs, Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { orderStatusTabs, orderTableColumns } from "./OrdersList.utils";
import Drawer from "~/components/shared/drawer";
import { OrderFiltersWrapper } from "./styles";
import OrderDetails from "../add-order/partials/OrderDetails";

export default function Index() {
  const [orderDetailsDrawerOpen, setOrderDetailsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  const tabItems = orderStatusTabs.map((item, i) => {
    const id = String(i + 1);
    return {
      label: item?.label,
      key: id,
      // children: `Content of tab ${id}`,
    };
  });

  const operations = <Button>Export as Excel</Button>;

  return (
    <>
      <h1 className="text-3xl">Your Orders</h1>
      <OrderFiltersWrapper className="flex w-full justify-start">
        <Tabs tabBarExtraContent={operations} items={tabItems} />
      </OrderFiltersWrapper>
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {
              setOrderDetailsDrawerOpen(true);
            },
          };
        }}
        columns={orderTableColumns}
        dataSource={data}
        loading={loading}
      />
      <Drawer
        width="90%"
        title="Order Details"
        size="large"
        open={orderDetailsDrawerOpen}
        onClose={() => setOrderDetailsDrawerOpen(false)}
        placement="right"
      >
        <OrderDetails />
      </Drawer>
    </>
  );
}
