import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "@remix-run/react";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as stateLoading } from "~/redux/app";
import { LoginUser } from "~/redux/app/actions/login";
import type { EmailLoginForm } from "~/types/login";

export default function EmailLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onFinish = async (data: EmailLoginForm) => {
    dispatch(LoginUser(data, navigate));
  };

  return (
    <Form onFinish={onFinish} layout="vertical" className="h-36 w-4/5">
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please enter email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please enter password",
          },
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        className="mb-4 w-full"
      >
        Next
      </Button>
      <Link to="/onboarding" className="text-gray-400 hover:text-gray-400">
        Don't have an account?
        <span className="text-black underline"> Register here</span>
      </Link>
    </Form>
  );
}
