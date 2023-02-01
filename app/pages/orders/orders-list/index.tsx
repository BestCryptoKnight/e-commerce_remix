import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Row, Alert, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { orderStatusTabs, orderTableColumns } from "./OrdersList.utils";
import Drawer from "~/components/shared/drawer";
import OrdersFilter from "~/components/shared/filter-columns";
import { OrderTableWrapper } from "./styles";
import OrderDetails from "../add-order/partials/OrderDetails";
import { GetAllOrdersAction } from "~/redux/app/actions/order";
import { useTranslation } from "react-i18next";
var XLSX = require("xlsx");
export default function Index() {
  let { t } = useTranslation();
  const [orderDetailsDrawerOpen, setOrderDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useAppDispatch();
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [tableColumns, setTableColumns] = useState<any>(orderTableColumns(t));
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetAllOrdersAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetAllOrdersAction(page, pageSize));
  };

  const tabItems = orderStatusTabs(t).map((item, i) => {
    const id: any = String(i + 1);
    return {
      label: item?.label,
      key: id,
    };
  });

  const operations = (
    <Button
      onClick={() => {
        const worksheet = XLSX.utils.json_to_sheet(list);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Orders.xlsx");
      }}
    >
      {t("EXPORT_AS_CSV")}
    </Button>
  );

  return (
    <OrderTableWrapper>
      <h2 className="text-3xl">Orders</h2>
      <Row gutter={24} className="flex items-baseline">
        <OrdersFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
      </Row>
      {/* <OrderFiltersWrapper className="flex w-full justify-start">
        <Tabs tabBarExtraContent={operations} items={tabItems} />
      </OrderFiltersWrapper> */}
      {list?.length === 0 && !loading ? (
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
          pagination={false}
        />
      )}
      <Pagination
        defaultCurrent={1}
        total={totalCount}
        style={{ padding: "40px 0" }}
        pageSize={10}
        showTotal={(total) => `Total ${total} items`}
        onChange={(current, pageSize) => getPaginatedItems(current, pageSize)}
      />

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
    </OrderTableWrapper>
  );
}
