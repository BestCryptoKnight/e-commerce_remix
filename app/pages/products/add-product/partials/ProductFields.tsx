import { Col, Form, InputNumber, Select } from "antd";
import { useQuery } from "urql";
import { GetTags } from "~/graphql/queries/tags";
import type { TagsTypes } from "~/types/tags";
const ProductFields = () => {
  const [tagsResult] = useQuery<{ getTags: TagsTypes[] }>({
    query: GetTags,
    variables: {
      vendorId: "63900eb5788c2b789fe57cb3",
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
