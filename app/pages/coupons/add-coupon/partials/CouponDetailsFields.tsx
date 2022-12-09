import { Col, Form, Input, InputNumber, Switch } from "antd";

const CouponDetailsFields = ({ selectedCoupon }: any) => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="title"
          label="Title"
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
          name="title_ar"
          label="Arabic Title"
          rules={[
            {
              required: true,
              message: "Please enter the arabic title...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="percentage"
          label="Percentage"
          rules={[
            {
              required: true,
              message: "Please enter the discount percentage...!",
            },
          ]}
        >
          <InputNumber />
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
