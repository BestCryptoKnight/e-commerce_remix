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
            <svg
              onClick={() => {
                setSelectedCategory(record);
                setCategoryDrawerOpen(true);
                setSelectedAction("edit-category");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>

            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => dispatch(DeleteCategoryAction(record.id))}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#dc3344"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
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
