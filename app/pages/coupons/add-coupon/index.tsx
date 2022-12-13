import CouponDetailsFields from "./partials/CouponDetailsFields";

import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";
import { CouponAction } from "~/redux/app/actions/coupon";
export default function CouponForm(
  { selectedCoupon }: any,
  { setCouponDrawerOpen }: any
) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    dispatch(CouponAction(data, setCouponDrawerOpen));
  };

  return (
    <AddCouponWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
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
