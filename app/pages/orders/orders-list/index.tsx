import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Tabs, Table, Button, Row, Alert } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { orderStatusTabs, orderTableColumns } from "./OrdersList.utils";
import Drawer from "~/components/shared/drawer";
import OrdersFilter from "~/components/shared/filter-columns";
import { OrderFiltersWrapper } from "./styles";
import OrderDetails from "../add-order/partials/OrderDetails";
import { GetOrdersAction } from "~/redux/app/actions/order";
import { useTranslation } from "react-i18next";

export default function Index() {
  let { t } = useTranslation();
  const [orderDetailsDrawerOpen, setOrderDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useAppDispatch();
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [tableColumns, setTableColumns] = useState<any>(orderTableColumns(t));
  const data = useAppSelector(StateData);
  const { list } = data;
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetOrdersAction());
  }, [dispatch]);

  const tabItems = orderStatusTabs(t).map((item, i) => {
    const id: any = String(i + 1);
    return {
      label: item?.label,
      key: id,
    };
  });

  const operations = <Button>{t("EXPORT_AS_CSV")}</Button>;

  return (
    <>
      <Row gutter={24} className="flex items-baseline">
        <OrdersFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
      </Row>
      <OrderFiltersWrapper className="flex w-full justify-start">
        <Tabs tabBarExtraContent={operations} items={tabItems} />
      </OrderFiltersWrapper>
      {list.length === 0 ? (
        <Alert
          message={t("NO_ORDERS")}
          description={t("ORDER_DESCRIPTIONS")}
          type="info"
          showIcon
        />
      ) : (
        <Table
          onRow={(record: any) => {
            return {
              onClick: () => {
                setSelectedOrder(record);
                setOrderDetailsDrawerOpen(true);
              },
            };
          }}
          columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
          dataSource={list}
          loading={loading}
        />
      )}

      <Drawer
        width="90%"
        title="Order Details"
        size="large"
        open={orderDetailsDrawerOpen}
        onClose={() => setOrderDetailsDrawerOpen(false)}
        placement="right"
      >
        <OrderDetails selectedOrder={selectedOrder} />
      </Drawer>
    </>
  );
}
