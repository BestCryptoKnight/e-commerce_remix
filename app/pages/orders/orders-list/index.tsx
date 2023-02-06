import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Row, Alert } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { orderStatusTabs, orderTableColumns } from "./OrdersList.utils";
import Drawer from "~/components/shared/drawer";
import OrdersFilter from "~/components/shared/filter-columns";
import { OrderTableWrapper } from "./styles";
import OrderDetails from "../add-order/partials/OrderDetails";
import { GetAllOrdersAction } from "~/redux/app/actions/order";
import { useTranslation } from "react-i18next";
import type { InputRef } from "antd";

export default function Index() {
  let { t } = useTranslation();
  const [orderDetailsDrawerOpen, setOrderDetailsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useAppDispatch();
  const [filteredColumn, setFilteredColumn] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const filterVendors = (filter: any) => {
    if (filter.status) {
      filter.status = filter?.status?.toUpperCase();
    }
    setSelectedFilter(filter);
  };

  const [tableColumns, setTableColumns] = useState<any>(
    orderTableColumns(
      t,
      searchText,
      searchInput,
      searchedColumn,
      setSearchText,
      setSearchedColumn,
      filterVendors
    )
  );

  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetAllOrdersAction(1, 10, selectedFilter));
  }, [dispatch, selectedFilter]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetAllOrdersAction(page, pageSize, selectedFilter));
  };

  return (
    <OrderTableWrapper>
      <h2 className="text-3xl">Orders # {totalCount}</h2>
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
          pagination={{
            defaultCurrent: 1,
            total: totalCount,
            pageSize: 10,
            showTotal(total) {
              return <p>Total {total} items</p>;
            },
            onChange: (current, pageSize) =>
              getPaginatedItems(current, pageSize),
          }}
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
    </OrderTableWrapper>
  );
}
