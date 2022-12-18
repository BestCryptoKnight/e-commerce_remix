import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks/Store";
import { Table, Button, Row, Checkbox } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import Drawer from "~/components/shared/drawer";
import TagsFilter from "~/components/shared/filter-columns";
import AddNewTag from "../tag-actions";
import { GetTagsAction } from "~/redux/app/actions/tags";
import { DeleteTagsAction } from "~/redux/app/actions/tags";
import { ActionButtonsWrapper } from "../styles";
import { Popconfirm } from "antd";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcons";

export default function Index() {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredColumn, setFilteredColumn] = useState([]);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetTagsAction());
  }, [dispatch]);

  const tagColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["md", "xs"],
      label: <Checkbox value="title">Title</Checkbox>,
    },
    {
      title: "Arabic Title",
      dataIndex: "title_ar",
      key: "title_ar",
      responsive: ["md", "xs"],
      label: <Checkbox value="title_ar">Arabic Title</Checkbox>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            <EditIcon
              onClick={() => {
                setSelectedTag(record);
                setTagDrawerOpen(true);
                setSelectedAction("edit-tag");
              }}
            />

            <Popconfirm
              title="Are you sure to delete this tag?"
              onConfirm={() => dispatch(DeleteTagsAction(record.id))}
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
  ];

  const [tableColumns, setTableColumns] = useState<any>(tagColumns);
  return (
    <>
      <h2 className="text-3xl">Tags</h2>
      <Row gutter={24} className="flex items-baseline justify-between">
        <TagsFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setTagDrawerOpen(true);
            setSelectedAction("create-tag");
          }}
        >
          Create Tag
        </Button>
      </Row>

      <Table
        dataSource={data}
        loading={loading}
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
      />
      <Drawer
        title={selectedAction === "create-tag" ? "Add Tag" : "Edit Tag"}
        size="large"
        open={tagDrawerOpen}
        onClose={() => {
          setTagDrawerOpen(false);
        }}
        placement="right"
      >
        <AddNewTag
          setTagDrawerOpen={setTagDrawerOpen}
          selectedTag={selectedTag}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      </Drawer>
    </>
  );
}
