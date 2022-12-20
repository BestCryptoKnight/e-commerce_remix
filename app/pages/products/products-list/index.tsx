import { useEffect, useState } from "react";
import {
  GetProductsAction,
  DeleteProductAction,
} from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm, Checkbox, Row } from "antd";
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
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  console.log("list", list);

  const [tableColumns, setTableColumns] = useState<any>([
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.image}
            alt={record?.title ? record?.title : record?.variants[0]?.title}
            width={50}
            height={50}
            className="rounded-lg object-cover"
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",

      render: (_: any, record: any) => {
        return (
          <p>{record?.title ? record?.title : record?.variants[0]?.title}</p>
        );
      },
    },
    {
      title: "Arabic Title",
      dataIndex: "title_ar",
      key: "title_ar",
      render: (_: any, record: any) => {
        return (
          <p>
            {record?.title_ar
              ? record?.title_ar
              : record?.variants[0]?.title_ar}
          </p>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: any) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: record?.description }} />
        );
      },
    },
    {
      title: "Arabic Description",
      dataIndex: "description_ar",
      key: "description_ar",
      render: (_: any, record: any) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: record?.description_ar }} />
        );
      },
    },
    ...productColumns,
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            <EditIcon
              onClick={() => {
                setSelectedAction("edit-product");
                setSelectedProduct(record);
                setProductDrawerOpen(true);
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
            setSelectedAction("new-product");
            setSelectedProduct(null);
            setProductDrawerOpen(true);
          }}
        >
          Create product
        </Button>
      </Row>

      <Table
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
        dataSource={list}
        loading={loading}
        size="middle"
        // count={totalCount}
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

