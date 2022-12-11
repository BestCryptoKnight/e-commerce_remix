import { useEffect, useState } from "react";
import {
  GetProductsAction,
  DeleteProductAction,
} from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";

import Drawer from "~/components/shared/drawer";
import AddNewProduct from "../add-product";
import type { ProductType } from "~/types/products";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { ActionButtonsWrapper } from "../styles";
import ProductFilter from "../product-filter";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export default function Index() {
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  const productTableColumns: ColumnsType<ProductType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["md", "xs"],
    },
    {
      title: "Arabic Title",
      dataIndex: "title_ar",
      key: "title_ar",
      responsive: ["md", "xs"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md", "xs"],
    },
    {
      title: "Arabic Description",
      dataIndex: "description_ar",
      key: "description_ar",
      responsive: ["md", "xs"],
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      responsive: ["md", "xs"],
    },
    {
      title: "Created At",
      render(value: string) {
        return <div>{moment(value).format("DD-MM-YYYY")}</div>;
      },
      responsive: ["sm"],
    },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            <EditFilled
              className="warning-icon"
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
              <DeleteFilled className="danger-icon" />
            </Popconfirm>
          </ActionButtonsWrapper>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <ProductFilter />
      </div>
      <div className="flex justify-end">
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
      </div>
      <Table
        columns={productTableColumns}
        dataSource={data}
        loading={loading}
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
    </>
  );
}
