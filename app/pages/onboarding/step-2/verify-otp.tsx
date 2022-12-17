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
        style={{ display: "flex", justifyContent: "center" }}
        rules={[
          {
            required: true,
            message: "Please enter the otp",
          },
        ]}
      >
        <OtpInput
          placeholder="OTP Code"
          inputStyle={{ width: 50, padding: "4px 10px" }}
          numInputs={4}
          separator={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#153774"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#153774"
              className="h-2 w-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
        Verify Code
      </Button>
    </Form>
  );
}
