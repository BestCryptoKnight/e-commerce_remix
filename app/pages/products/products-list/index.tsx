import { useEffect, useState } from "react";
import {
  GetProductsAction,
  DeleteProductAction,
} from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm, Checkbox, Row, Col } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { ProductTableWrapper } from "../styles";
import Drawer from "~/components/shared/drawer";
import AddNewProduct from "../add-product";

import { ActionButtonsWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";
import { productColumns } from "./ProductList.utils";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcons";

export default function Index() {
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredColumn, setFilteredColumn] = useState([]);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  const [tableColumns, setTableColumns] = useState<any>([
    ...productColumns,
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            <EditIcon
              onClick={() => {
                setSelectedProduct(record);
                setProductDrawerOpen(true);
                setSelectedAction("edit-product");
              }}
            />

            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => dispatch(DeleteProductAction(record.id))}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
            >
              <div>
                <DeleteIcon />
              </div>
            </Popconfirm>
          </ActionButtonsWrapper>
        );
      },
      label: <Checkbox value="actions">Actions</Checkbox>,
    },
  ]);

  return (
    <ProductTableWrapper>
      <h2 className="text-3xl">Products</h2>
      <Row gutter={24} className="flex items-baseline justify-between">
        <ProductFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />

        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setProductDrawerOpen(true);
            setSelectedAction("new-product");
          }}
        >
          Create product
        </Button>
      </Row>

      <Table
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
        dataSource={data}
        loading={loading}
        size="middle"
      />
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
          selectedProduct={selectedProduct}
          setProductDrawerOpen={setProductDrawerOpen}
          selectedAction={selectedAction}
        />
      </Drawer>
    </ProductTableWrapper>
  );
}
