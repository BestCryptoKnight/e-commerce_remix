import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks/Store";
import { Table, Button } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { tagsTableColumns } from "./tags.utils";
import Drawer from "~/components/shared/drawer";
import AddNewTag from "../add-tags";
import { GetTagsAction } from "~/redux/app/actions/tags";

export default function Index() {
  const [tagDrawerOpen, setTagDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const loading = useAppSelector(StateLoading);

  useEffect(() => {
    dispatch(GetTagsAction());
  }, []);

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
      <Table dataSource={data} loading={loading} columns={tagsTableColumns} />
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
