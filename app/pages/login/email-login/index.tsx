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
        rules={[
          {
            required: true,
            message: "Please enter email",
          },
        ]}
      >
        <Input
          placeholder="Email Address"
          style={{ padding: 10 }}
          prefix={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#bfbfbf"
              className="mb-1 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
              />
            </svg>
          }
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter password",
          },
        ]}
      >
        <Input
          placeholder="Password"
          prefix={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#bfbfbf"
              className="mb-1 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          }
          style={{ padding: 10 }}
          type="password"
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        className="mb-4 w-full uppercase"
      >
        Login
      </Button>
      <Link to="/onboarding" className="text-gray-400 hover:text-gray-400">
        Don't have an account?
        <span className="tjwl-bold text-green"> Register here</span>
      </Link>
    </Form>
  );
}
