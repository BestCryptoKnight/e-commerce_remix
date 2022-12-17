import { useEffect, useState } from "react";
import {
  DeleteCategoryAction,
  GetCategoriesAction,
} from "~/redux/app/actions/category";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Button, Popconfirm, Row, Checkbox, Tag } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { categoriesColumns } from "./Categories.utils";
import CategoriesFilter from "~/components/shared/filter-columns";
import Drawer from "~/components/shared/drawer";
import AddNewCategory from "../add-category";
import { ActionButtonsWrapper } from "./styles";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcons";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [filteredColumn, setFilteredColumn] = useState([]);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [dispatch]);

  const [tableColumns, setTableColumns] = useState<any>([
    ...categoriesColumns,
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      responsive: ["md", "xs"],
      render: (_: any, record: any) => {
        return (
          <Tag color={record?.active ? "green" : "red"}>
            {record?.active ? "Active" : "Inactive"}
          </Tag>
        );
      },
      label: <Checkbox value="description">Description </Checkbox>,
    },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            <EditIcon
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
              <DeleteIcon />
            </Popconfirm>
          </ActionButtonsWrapper>
        );
      },
      label: <Checkbox value="actions">Actions</Checkbox>,
    },
  ]);

  return (
    <>
      <h2 className="text-3xl">Categories</h2>
      <Row gutter={24} className="flex items-baseline justify-between">
        <CategoriesFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
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
      </Row>

      <Table
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
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
