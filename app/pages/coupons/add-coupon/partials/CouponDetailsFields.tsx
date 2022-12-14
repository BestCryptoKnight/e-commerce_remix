import { Col, Form, Input, InputNumber, Switch } from "antd";

const CouponDetailsFields = ({ selectedCoupon }: any) => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="discount"
          label="Discount"
          rules={[
            {
              required: true,
              message: "Please enter the discount...!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="code"
          label="code"
          rules={[
            {
              required: true,
              message: "Please enter the code...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="active" label="Active" initialValue={true}>
          <Switch />
        </Form.Item>
      </Col>
    </>
  );
};

export default CouponDetailsFields;
