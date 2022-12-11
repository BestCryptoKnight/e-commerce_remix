import { useEffect } from "react";
import Availibility from "./partials/AddVariant";
import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "../styles";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { TagAction } from "~/redux/app/actions/tags";
import { drawerLoading as StateDrawerLoading } from "~/redux/app";

export default function CouponForm({
  setVariantDrawerOpen,
  selectedVariant,
  selectedAction,
  setSelectedAction,
}: any) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const drawerLoading = useAppSelector(StateDrawerLoading);

  useEffect(() => {
    if (selectedAction == "edit-variant") {
    } else {
      form.resetFields();
    }
  }, [selectedVariant, form, selectedAction]);

  const onFinish = (values: any) => {
    if (selectedAction == "edit-variant") {
      values.id = selectedVariant.id;
    }
    dispatch(TagAction(values, setVariantDrawerOpen, selectedAction, form));
  };

  return (
    <AddCouponWrapper>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
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
