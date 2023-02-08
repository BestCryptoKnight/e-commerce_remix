import { Button, Form, Input } from "antd";
import { useAppSelector } from "~/hooks/Store";
import { loading as stateLoading } from "~/redux/app";

export default function PhoneLogin() {
  const loading = useAppSelector(stateLoading);

  return (
    <Form layout="vertical" className="w-4/5">
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
