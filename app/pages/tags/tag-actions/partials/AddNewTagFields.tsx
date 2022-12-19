import { Col, Form, Input, Switch, Select } from "antd";
import { useQuery } from "urql";
import { GetFilterProducts } from "~/graphql/queries/products";
import Cookies from "universal-cookie";
import type { ProductType } from "~/types/products";
const AddTagsFields = () => {
  const cookies = new Cookies();

  const [services] = useQuery<{ getProducts: { list: ProductType[] } }>({
    query: GetFilterProducts,
    variables: {
      vendorId: cookies.get("vendorId"),
      type: "SERVICE",
      field: "type",
    },
  });

  return (
    <>
      <Col span={24}>
        <Form.Item name="active" label="Active">
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter the title...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="title_ar"
          label="Arabic Title"
          rules={[
            {
              required: true,
              message: "Please enter the arabic title...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="productIds"
          label="Services"
          rules={[
            {
              required: true,
              message: "Please select a service.",
            },
          ]}
        >
          <Select
            mode="multiple"
            options={(services?.data?.getProducts?.list || []).map(
              (t: ProductType) => ({
                value: t.id,
                label: t.title,
              })
            )}
          ></Select>
        </Form.Item>
      </Col>
    </>
  );
};

export default AddTagsFields;
