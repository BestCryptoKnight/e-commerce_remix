import { useEffect, useState } from "react";
import { GetVendorViewAction } from "~/redux/app/actions/vendor_view";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Row, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { VendorTableWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";
import { vendorColumns } from "./VendorList.utils";

export default function Index() {
  const [filteredColumn, setFilteredColumn] = useState([]);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  console.log("table data", data);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(GetVendorViewAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetVendorViewAction(page, pageSize));
  };

  const [tableColumns, setTableColumns] = useState<any>(vendorColumns);

  return (
    <VendorTableWrapper>
      <h2 className="text-3xl">Vendors</h2>
      <Row gutter={24} className="flex items-baseline justify-between">
        <ProductFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
      </Row>

      <div className="flex flex-col items-end justify-center">
        <Table
          columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
          dataSource={list}
          loading={loading}
          size="middle"
          pagination={false}
        />

        <Pagination
          defaultCurrent={1}
          total={totalCount}
          style={{ padding: "40px 0" }}
          pageSize={10}
          showTotal={(total) => `Total ${total} items`}
          onChange={(current, pageSize) => getPaginatedItems(current, pageSize)}
        />
      </div>
    </VendorTableWrapper>
  );
}
