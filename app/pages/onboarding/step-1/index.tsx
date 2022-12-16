import { Button, Form, Input } from "antd";
import type { StepOneFormFields } from "~/types/onboarding";
import { CreateUser } from "~/redux/app/actions/onboarding/";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as stateLoading } from "~/redux/app";
import { UserOutlined } from "@ant-design/icons";

export default function StepOne({ next }: { next: () => void }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: StepOneFormFields) => {
    dispatch(CreateUser(data, next));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please enter first name",
          },
        ]}
      >
        <Input
          placeholder="First Name"
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          }
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please enter last name",
          },
        ]}
      >
        <Input
          placeholder="Last Name"
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          }
        />
      </Form.Item>
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
          type="email"
          placeholder="Email Address"
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
          type="password"
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
        />
      </Form.Item>

      <Form.Item
        name="confirmPass"
        rules={[
          {
            required: true,
            message: "Please enter password",
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Confirm Password"
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
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        className="w-full"
      >
        Next
      </Button>
    </Form>
  );
}
