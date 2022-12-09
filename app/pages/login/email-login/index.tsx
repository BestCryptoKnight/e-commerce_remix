import { Button, Form, Input } from "antd";
import type { StepOneFormFields } from "~/types/onboarding";
import { CreateUser } from "~/redux/app/actions/onboarding/";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as stateLoading } from "~/redux/app";

export default function EmailLogin() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: StepOneFormFields) => {
    // dispatch(CreateUser(data));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical" className="h-36 w-4/5">
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
        className="w-full"
      >
        Next
      </Button>
    </Form>
  );
}
