import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import slugify from "slugify";
import { CreateVendorAction } from "~/redux/app/actions/vendors";
import { Button, Form, Input } from "antd";
import { useAppDispatch } from "~/hooks/Store";
import type { CreateVendor } from "~/types/onboarding";

export default function StepTwo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [suggestedSlug, setSlugSuggestion] = useState("");
  const onFinish = async (data: CreateVendor) => {
    dispatch(CreateVendorAction(data, navigate));
  };

  const getSuggestedSlug = (e: { target: { value: string } }) => {
    const suggestedSlug = slugify(e.target.value, {
      replacement: "-",
      remove: /[^\w\s]/gi,
    })
      .replace(/'_+/g, "")
      .toLowerCase();

    setSlugSuggestion(suggestedSlug);
  };

  useEffect(() => {
    form.setFieldsValue({
      slug: suggestedSlug,
    });
  }, [suggestedSlug, form]);

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="name" label="Store Name">
        <Input name="name" onChange={getSuggestedSlug} />
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
