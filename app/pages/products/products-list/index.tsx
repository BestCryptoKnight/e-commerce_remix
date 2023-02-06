import { useEffect, useState, useRef } from "react";
import { GetProductsAction } from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Row } from "antd";
import type { InputRef } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { ProductTableWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";
import { productColumns } from "./ProductList.utils";

export default function Index() {
  const [searchConfig, setSearchConfig] = useState<any>({
    filter: {},
    sortOrder: { direction: "desc", field: "createdAt" },
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const filterVendors = (filter: any) => {
    setSearchConfig({
      ...searchConfig,
      filter,
    });
  };

  const [filteredColumn, setFilteredColumn] = useState(
    productColumns(
      searchText,
      searchInput,
      searchedColumn,
      setSearchText,
      setSearchedColumn,
      filterVendors
    )
  );

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(
      GetProductsAction(1, 10, searchConfig.filter, searchConfig.sortOrder)
    );
  }, [dispatch, searchConfig]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(
      GetProductsAction(
        page,
        pageSize,
        searchText ? searchConfig.filter : {},
        searchConfig.sortOrder
      )
    );
  };

  const [tableColumns, setTableColumns] = useState<any>();

  return (
    <ProductTableWrapper>
      <h2 className="text-3xl">Products # {totalCount}</h2>
      <Row gutter={24} className="mb-4 flex items-baseline justify-between">
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
          dataSource={list?.length > 0 ? list : []}
          loading={loading}
          sortDirections={["ascend", "descend"]}
          size="middle"
          onChange={(pagination, filters, sorter: any) => {
            setSearchConfig({
              ...searchConfig,
              sortOrder: {
                direction:
                  sorter?.order == "ascend"
                    ? sorter?.order?.substring(0, 3)
                    : "desc",
                field: sorter?.columnKey,
              },
            });
          }}
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
    </ProductTableWrapper>
  );
}
