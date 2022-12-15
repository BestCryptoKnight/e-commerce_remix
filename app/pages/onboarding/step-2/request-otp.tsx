import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { SendOTPAction } from "~/redux/app/actions/onboarding";
import { loading as stateLoading } from "~/redux/app";
import type { OTPActions } from "~/types/onboarding";

export default function OTP({ next }: { next: () => void }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: OTPActions) => {
    const dialcode = "00966";
    const phone = { phone: dialcode.concat(data.phone) };

    dispatch(SendOTPAction(phone, next));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <div className="flex w-full items-center">
        <Form.Item
          name="dialcode"
          style={{ width: "24%" }}
          rules={[
            {
              required: false,
              message: "Please enter phone number",
            },
          ]}
        >
          <Input
            type="number"
            readOnly
            style={{ padding: "10px 10px" }}
            defaultValue="00966"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          style={{ width: "80%", marginLeft: 4 }}
          rules={[
            {
              required: false,
              message: "Please enter phone number",
            },
          ]}
        >
          <Input
            style={{ padding: "10px 5px" }}
            placeholder="Phone number"
            type="number"
          />
        </Form.Item>
      </div>

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
