import { useEffect, useState } from "react";
import { GetProductsAction } from "../../../redux/app/actions/product";
import { useAppDispatch, useAppSelector } from "../../../hooks/Store";
import { Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { productTableColumns } from "./ProductsList.utils";
import Drawer from "~/components/shared/drawer";
import AddNewProduct from "../add-product";

export default function Index() {
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetProductsAction());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mb-4"
          onClick={() => setProductDrawerOpen(true)}
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
        title="Add product"
        size="large"
        open={productDrawerOpen}
        onClose={() => setProductDrawerOpen(false)}
        placement="right"
      >
        <AddNewProduct
          selectedProduct={null}
          setProductDrawerOpen={setProductDrawerOpen}
        />
      </Drawer>
    </>
  );
}
