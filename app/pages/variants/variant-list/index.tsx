import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks/Store";
import { Table, Button, Row, Checkbox } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import Drawer from "~/components/shared/drawer";
import AddNewVariant from "../variant-actions";
import { GetTagsAction } from "~/redux/app/actions/tags";
// import { DeleteTagsAction } from "~/redux/app/actions/tags";
// import { ActionButtonsWrapper } from "../styles";
// import { Popconfirm } from "antd";
// import type { CouponType } from "~/types/coupons";
// import type { ColumnsType } from "antd/es/table";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
import VariantsFilter from "~/components/shared/filter-columns";

export default function Index() {
  const [variantDrawerOpen, setVariantDrawerOpen] = useState(false);
  const [selectedVariant, setSelectedTag] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredColumn, setFilteredColumn] = useState([]);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetTagsAction());
  }, [dispatch]);

  const variantColumns = [
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
    // {
    //   title: "Actions",
    //   render: (_: any, record: any) => {
    //     return (
    //       <ActionButtonsWrapper>
    //         <EditFilled
    //           className="warning-icon"
    //           onClick={() => {
    //             setSelectedTag(record);
    //             setVariantDrawerOpen(true);
    //             setSelectedAction("edit-variant");
    //           }}
    //         />
    //         <Popconfirm
    //           title="Are you sure to delete this variant?"
    //           onConfirm={() => dispatch(DeleteTagsAction(record.id))}
    //           onCancel={() => console.log("cancel")}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <DeleteFilled className="danger-icon" />
    //         </Popconfirm>
    //       </ActionButtonsWrapper>
    //     );
    //   },
    // },
  ];

  const [tableColumns, setTableColumns] = useState<any>(variantColumns);
  return (
    <>
      <h2 className="text-3xl">Variants</h2>
      <Row gutter={24} className="flex items-baseline">
        <VariantsFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
        <Button
          type="primary"
          className="mb-4"
          onClick={() => {
            setVariantDrawerOpen(true);
            setSelectedAction("create-variant");
          }}
        >
          Create Variant
        </Button>
      </Row>

      <Table
        dataSource={data}
        loading={loading}
        columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
      />
      <Drawer
        title={
          selectedAction === "create-variant" ? "Add Variant" : "Edit Variant"
        }
        size="large"
        open={variantDrawerOpen}
        onClose={() => {
          setVariantDrawerOpen(false);
        }}
        placement="right"
      >
        <AddNewVariant
          setVariantDrawerOpen={setVariantDrawerOpen}
          selectedTag={selectedVariant}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      </Drawer>
    </>
  );
}
