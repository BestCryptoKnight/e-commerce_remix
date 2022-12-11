import { useEffect, useState } from "react";
import { GetCategoriesAction } from "~/redux/app/actions/category";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { categoryTableColumns } from "./CategoriesList.utils";
import Drawer from "~/components/shared/drawer";
import AddNewCategory from "../add-category";

export default function Index() {
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mb-4"
          onClick={() => setCategoryDrawerOpen(true)}
        >
          Create category
        </Button>
      </div>
      <Table
        columns={categoryTableColumns}
        dataSource={data}
        loading={loading}
      />
      <Drawer
        title="Add category"
        size="large"
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        placement="right"
      >
        <AddNewCategory
          selectedCategory={null}
          setCategoryDrawerOpen={setCategoryDrawerOpen}
        />
      </Drawer>
    </>
  );
}
