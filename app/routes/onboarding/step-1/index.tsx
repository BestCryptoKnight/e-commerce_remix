import { Button, Form, Input } from "antd";
import type { StepOneFormFields } from "~/types/onboarding";
import { CreateUser } from "~/redux/app/actions/onboarding/";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as stateLoading } from "~/redux/app";

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
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please enter first name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please enter last name",
          },
        ]}
      >
        <Input />
      </Form.Item>
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

      <Form.Item
        name="confirmPass"
        label="Confirm password"
        rules={[
          {
            required: true,
            message: "Please enter password",
          },
        ]}
      >
        <Input type="password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Next
      </Button>
    </Form>
  );
}
