import { Button, Form, Col, Row, Input, InputNumber } from "antd";
import { useEffect } from "react";
import Cookies from "universal-cookie";
const UserProfile = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("userInfo")) {
      form.setFieldsValue(cookies.get("userInfo"));
    }
  }, [form]);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="firstName" label="First Name">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="lastName" label="Last Name">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="phone" label="Phone number">
            <Input disabled />
          </Form.Item>
        </Col>

        {/* <Col span={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col> */}
      </Row>
    </Form>
  );
};

export default UserProfile;
