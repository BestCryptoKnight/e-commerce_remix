import { useEffect, useState } from "react";
import { GetProductsAction } from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Row, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { ProductTableWrapper } from "../styles";
import Drawer from "~/components/shared/drawer";
import AddNewProduct from "../add-product";
import ProductFilter from "~/components/shared/filter-columns";
import { productColumns } from "./ProductList.utils";

export default function Index() {
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredColumn, setFilteredColumn] = useState(productColumns);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(GetProductsAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetProductsAction(page, pageSize));
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

        {/* <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setSelectedAction("new-product");
            setSelectedProduct(null);
            setProductDrawerOpen(true);
          }}
        >
          Create product
        </Button> */}
      </Row>

      <div className="flex flex-col items-end justify-center">
        <Table
          columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
          dataSource={list.length > 0 ? list : []}
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

      <Drawer
        title={
          selectedAction === "new-product" ? "Add product" : "Edit product"
        }
        size="large"
        open={productDrawerOpen}
        onClose={() => setProductDrawerOpen(false)}
        placement="right"
      >
        <AddNewProduct
          totalCount={totalCount}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          setProductDrawerOpen={setProductDrawerOpen}
          selectedAction={selectedAction}
        />
      </Drawer>
    </ProductTableWrapper>
  );
}
