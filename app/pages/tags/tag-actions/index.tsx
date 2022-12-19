import { useEffect } from "react";
import AddNewTag from "./partials/AddNewTagFields";
import Availibility from "./partials/Availibility";
import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "../styles";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { TagAction } from "~/redux/app/actions/tags";
import moment from "moment";
import { drawerLoading as StateDrawerLoading } from "~/redux/app";

export default function CouponForm({
  setTagDrawerOpen,
  selectedTag,
  selectedAction,
  setSelectedAction,
}: any) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const drawerLoading = useAppSelector(StateDrawerLoading);

  useEffect(() => {
    if (selectedAction == "edit-tag") {
      const tagToUpdate: any = {};
      tagToUpdate.active = selectedTag.active;
      tagToUpdate.title = selectedTag.title;
      tagToUpdate.title_ar = selectedTag.title_ar;
      tagToUpdate.workdays = selectedTag?.workdays?.map((workday: any) => {
        return {
          day: workday?.day,
          startTime: moment(workday?.startTime),
          endTime: moment(workday?.startTime),
        };
      });

      form.setFieldsValue(tagToUpdate);
    } else {
      form.resetFields();
    }
  }, [selectedTag, form, selectedAction]);

  const onFinish = (values: any) => {
    if (selectedAction == "edit-tag") {
      values.id = selectedTag.id;
    }
    dispatch(TagAction(values, setTagDrawerOpen, selectedAction, form));
  };

  return (
    <AddCouponWrapper>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <AddNewTag />
          <Availibility />

          <Col span={24}>
            <Button type="primary" htmlType="submit" loading={drawerLoading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddCouponWrapper>
  );
}
