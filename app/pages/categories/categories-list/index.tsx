import { useEffect, useState } from "react";
import {
  DeleteCategoryAction,
  GetCategoriesAction,
} from "~/redux/app/actions/category";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import moment from "moment";
import Drawer from "~/components/shared/drawer";
import AddNewCategory from "../add-category";
import type { CategoryType } from "~/types/categories";
import type { ColumnsType } from "antd/es/table";
import { ActionButtonsWrapper } from "./styles";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  const categoryTableColumns: ColumnsType<CategoryType> = [
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
      title: "Active",
      dataIndex: "active",
      key: "active",
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
                setSelectedCategory(record);
                setCategoryDrawerOpen(true);
                setSelectedAction("edit-category");
              }}
            />
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => dispatch(DeleteCategoryAction(record.id))}
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
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setCategoryDrawerOpen(true);
            setSelectedAction("new-category");
          }}
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
        title={
          selectedAction === "new-category" ? "Add category" : "Edit category"
        }
        size="large"
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        placement="right"
      >
        <AddNewCategory
          selectedAction={selectedAction}
          selectedCategory={selectedCategory}
          setCategoryDrawerOpen={setCategoryDrawerOpen}
        />
      </Drawer>
    </>
  );
}
