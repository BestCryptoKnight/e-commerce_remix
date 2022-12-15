import { Col, Form, InputNumber, Select } from "antd";
import { useQuery } from "urql";
import { GetTags } from "~/graphql/queries/tags";
import type { TagsTypes } from "~/types/tags";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const ProductFields = () => {
  const [tagsResult] = useQuery<{ getTags: TagsTypes[] }>({
    query: GetTags,
    variables: {
      vendorId: cookies.get("vendorId"),
    },
  });

  const { data: tags } = tagsResult;

  return (
    <>
      <Col span={12}>
        <Form.Item name="itemsInStock" label="Items In Stock">
          <InputNumber min={0} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="tagIds" label="Tag">
          <Select
            mode="multiple"
            options={(tags?.getTags || []).map((t: TagsTypes) => ({
              value: t.id,
              label: t.title,
            }))}
          ></Select>
        </Form.Item>
      </Col>
    </>
  );
};

export default ProductFields;
