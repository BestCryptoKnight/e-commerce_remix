import { useNavigate } from "@remix-run/react";
import slugify from "slugify";
import { CreateVendorAction } from "~/redux/app/actions/vendors";

import { Button, Form, Input } from "antd";

export default function StepTwo() {
  let navigate = useNavigate();

  const onFinish = async (data: { name: string; slug: string }) => {
    const { name, slug } = data;
  };

  // const getSuggestedSlug = (e: { target: { value: string } }) => {
  //   const suggestedSlug = slugify(e.target.value, {
  //     replacement: "-",
  //     remove: /[^\w\s]/gi,
  //   })
  //     .replace(/'_+/g, "")
  //     .toLowerCase();

  //   setSlugSuggestion(suggestedSlug);
  // };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" label="Store Name">
        <Input name="name" />
      </Form.Item>

      <Form.Item name="slug" label="My Site">
        <Input
          addonBefore="https://anyaa/"
          addonAfter=".io"
          placeholder="mysite"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Done!
      </Button>
    </Form>
  );
}
