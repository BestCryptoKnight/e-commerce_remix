import { useEffect } from "react";
import OrderDetailsFields from "./partials/OrderDetails";
import { Row, Col, Button, Form } from "antd";
import { AddOrderWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";


export default function OrderForm({
  selectedCategory,
  setCategoryDrawerOpen,
}: any) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue(selectedCategory);
    }
  }, [selectedCategory, form]);

  const onSubmit = async (data: any) => {};

  return (
    <AddOrderWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
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
