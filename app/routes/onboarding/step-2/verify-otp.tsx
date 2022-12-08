import { Button, Form } from "antd";
import OtpInput from "react-otp-input";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { VerifyOTPAction } from "~/redux/app/actions/onboarding/";
import { loading as stateLoading } from "~/redux/app";

export default function VerifyOTP({ next }: { next: () => void }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(stateLoading);

  const onSubmit = async (data: { code: string; phone: string }) => {
    dispatch(VerifyOTPAction(data, next));
  };

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item
        name="code"
        label="OTP Code"
        rules={[
          {
            required: true,
            message: "Please enter the otp",
          },
        ]}
      >
        <OtpInput
          inputStyle={{ width: 50, padding: "4px 10px" }}
          numInputs={4}
          separator={<span>-</span>}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Verify Code
      </Button>
    </Form>
  );
}
