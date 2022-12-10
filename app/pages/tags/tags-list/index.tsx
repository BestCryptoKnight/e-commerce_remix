import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks/Store";
import { Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import Drawer from "~/components/shared/drawer";
import AddNewTag from "../add-tags";
import { GetTagsAction } from "~/redux/app/actions/tags";
import { DeleteTagsAction } from "~/redux/app/actions/tags";
import { ActionButtonsWrapper } from "../styles";
import { Popconfirm } from "antd";
import type { CouponType } from "~/types/coupons";
import type { ColumnsType } from "antd/es/table";
import { DeleteFilled } from "@ant-design/icons";

export default function Index() {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetTagsAction());
  }, [dispatch]);

  const tagColumns: ColumnsType<CouponType> = [
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
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <ActionButtonsWrapper>
            {/* <EditFilled style={{ fontSize: "24px" }} /> */}
            <Popconfirm
              title="Are you sure to delete this tag?"
              onConfirm={() => dispatch(DeleteTagsAction(record.id))}
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
          onClick={() => setTagDrawerOpen(true)}
        >
          Create Tag
        </Button>
      </div>
      <Table dataSource={data} loading={loading} columns={tagColumns} />
      <Drawer
        title="Add Tag"
        size="large"
        open={tagDrawerOpen}
        onClose={() => setTagDrawerOpen(false)}
        placement="right"
      >
        <AddNewTag tagDrawerOpen={null} setTagDrawerOpen={setTagDrawerOpen} />
      </Drawer>
    </>
  );
}
