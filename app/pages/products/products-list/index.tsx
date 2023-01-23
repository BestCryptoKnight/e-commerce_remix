import { useEffect, useState } from "react";
import {
  GetProductsAction,
  DeleteProductAction,
} from "~/redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm, Checkbox, Row, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { ProductTableWrapper } from "../styles";
import Drawer from "~/components/shared/drawer";
import AddNewProduct from "../add-product";
import { ActionButtonsWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";
import { productColumns } from "./ProductList.utils";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcons";
import ImageIcon from "~/assets/icons/ImageIcon";

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
    //save current page and pagesize in store and pass it here
    dispatch(GetProductsAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetProductsAction(page, pageSize));
  };

  const [tableColumns, setTableColumns] = useState<any>([
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",

      render: (_: any, record: any) => {
        return (
          <p>{record?.vendor ? record?.vendor?.id : ''}</p>
        );
      },
      label: <Checkbox value="vendorId">Vendor ID</Checkbox>,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",

      render: (_: any, record: any) => {
        return (
          <p>{record?.vendor ? record?.vendor?.name : ''}</p>
        );
      },
      label: <Checkbox value="vendorName">Vendor Name</Checkbox>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => {
        return (
          <>
            {record?.image ? (
              <img
                src={record.image}
                alt={record?.title ? record?.title : record?.variants[0]?.title}
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </>
        );
      },
      label: <Checkbox value="image">Image</Checkbox>,
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
      label: <Checkbox value="title">Title</Checkbox>,
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
      label: <Checkbox value="title_ar">Arabic Title</Checkbox>,
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
      label: <Checkbox value="description">English Description</Checkbox>,
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
      label: <Checkbox value="description_ar">Arabic Description</Checkbox>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => {
        return (
          <>
            {record?.variants
              ? record?.variants.map((variant: any, idx: number) => {
                return <p key={idx}>{variant?.title + ':' + variant?.price}</p>
              })
              : record?.variants[0]?.title_ar}
          </>
          // <div variants />
        );
      },
      label: <Checkbox value="price">Arabic Description</Checkbox>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => {
        return (
          <p>{record?.createdAt ? record?.createdAt : ''}</p>
        );
      },
      label: <Checkbox value="createdAt">Created At</Checkbox>,
    },
    // ...productColumns,
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_: any, record: any) => {
    //     return (
    //       <ActionButtonsWrapper>
    //         <EditIcon
    //           onClick={() => {
    //             setSelectedAction("edit-product");
    //             setSelectedProduct(record);
    //             setProductDrawerOpen(true);
    //           }}
    //         />

    //         <Popconfirm
    //           title="Are you sure to delete this product?"
    //           onConfirm={() => dispatch(DeleteProductAction(record.id))}
    //           onCancel={() => console.log("cancel")}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <div>
    //             <DeleteIcon />
    //           </div>
    //         </Popconfirm>
    //       </ActionButtonsWrapper>
    //     );
    //   },
    //   label: <Checkbox value="actions">Actions</Checkbox>,
    // },
  ]);

  return (
    <ProductTableWrapper>
      <h2 className="text-3xl">Products</h2>
      <Row gutter={24} className="flex items-baseline justify-between mb-4">
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

