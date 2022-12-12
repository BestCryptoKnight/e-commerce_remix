import { Button, Form, Col, Row, Input, InputNumber } from "antd";
const UserProfile = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="addressUrl" label="Address URL">
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="contactName" label="Contact Name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Contact phone number">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="business_phone_number" label="Business phone number">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="storeLocation" label="Store Location">
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserProfile;
