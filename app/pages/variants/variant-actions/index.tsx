import VariantOptions from "./partials/AddVariant";
import { Row, Col, Button, Form, Input } from "antd";
import { AddCouponWrapper } from "../styles";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { drawerLoading as StateDrawerLoading, loading } from "~/redux/app";
import { CreateVariantAction } from "~/redux/app/actions/variants";

export default function VariantForm({ setVariantDrawerOpen, screen }: any) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const drawerLoading = useAppSelector(loading);

  const onFinish = (values: any) => {
    dispatch(CreateVariantAction(values, setVariantDrawerOpen, screen));
  };

  return (
    <AddCouponWrapper>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter the title...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Arabic Title"
              name="title_ar"
              rules={[
                {
                  required: true,
                  message: "Please enter the title...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <VariantOptions />

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
