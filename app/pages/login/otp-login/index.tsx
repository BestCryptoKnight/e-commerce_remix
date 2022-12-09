import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { SendOTPAction } from "~/redux/app/actions/onboarding";
import { loading as stateLoading } from "~/redux/app";
import type { OTPActions } from "~/types/onboarding";

export default function PhoneLogin() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: OTPActions) => {
    dispatch(SendOTPAction(data, () => {}));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical" className="w-4/5">
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please enter phone number",
          },
        ]}
      >
        <Input placeholder="Phone Number" type="number" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        className="w-full"
      >
        Send Code
      </Button>
    </Form>
  );
}
