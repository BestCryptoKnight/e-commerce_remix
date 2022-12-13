import { Button, Form, Col, Row, Input } from "antd";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as StateLoading } from "~/redux/app";
import { ChangePassword } from "~/redux/app/actions/login";

const UserProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("userInfo")) {
      form.setFieldsValue(cookies.get("userInfo"));
    }
  }, [form]);
  const onFinish = (values: any) => {
    console.log(values);
    dispatch(ChangePassword(values));
  };
  return (
    <>
      <Form form={form} layout="vertical">
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
      <br />
      <h3>Change Password</h3>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="newPassword" label="New Password">
              <Input type="password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="oldPassword" label="Old Password">
              <Input type="password" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserProfile;
