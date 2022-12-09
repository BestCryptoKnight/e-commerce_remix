import CouponDetailsFields from "./partials/CouponDetailsFields";

import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "./styles";
export default function CouponForm({ selectedCoupon }: any) {
  const [form] = Form.useForm();

  return (
    <AddCouponWrapper>
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <CouponDetailsFields selectedCoupon={selectedCoupon} />

          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddCouponWrapper>
  );
}
