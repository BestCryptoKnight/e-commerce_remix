import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { SendOTPAction } from "~/redux/app/actions/onboarding";
import { loading as stateLoading } from "~/redux/app";
import type { OTPActions } from "~/types/onboarding";

export default function OTP({ next }: { next: () => void }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: OTPActions) => {
    dispatch(SendOTPAction(data, next));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item
        name="phone"
        label="Phone number"
        rules={[
          {
            required: true,
            message: "Please enter phone number",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Send Code
      </Button>
    </Form>
  );
}
