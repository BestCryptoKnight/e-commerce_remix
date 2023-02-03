import { useEffect, useState, useRef } from "react";
import { GetVendorViewAction } from "~/redux/app/actions/vendor_view";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Row } from "antd";
import type { InputRef } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { VendorTableWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";
import { vendorColumns } from "./VendorList.utils";

export default function Index() {
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);

  const filterVendors = (filter: any) => {
    dispatch(GetVendorViewAction(1, 10, filter));
  };

  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(GetVendorViewAction(1, 10, {}));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    if (!filteredColumn) dispatch(GetVendorViewAction(page, pageSize, {}));
  };

  const [tableColumns, setTableColumns] = useState<any>(
    vendorColumns(
      searchText,
      searchInput,
      searchedColumn,
      setSearchText,
      setSearchedColumn,
      filterVendors
    )
  );

  return (
    <VendorTableWrapper>
      <h2 className="text-3xl">Vendors # {totalCount}</h2>
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
      </div>
    </VendorTableWrapper>
  );
}
