import { useEffect } from "react";
import OrderDetailsFields from "./partials/OrderDetails";
import { Row, Col, Button, Form } from "antd";
import { AddOrderWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";

export default function OrderForm({ selectedCategory }: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue(selectedCategory);
    }
  }, [selectedCategory, form]);

  return (
    <AddOrderWrapper>
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <OrderDetailsFields />
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddOrderWrapper>
  );
}
