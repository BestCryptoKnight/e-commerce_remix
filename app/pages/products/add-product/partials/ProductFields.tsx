import { Col, Form, InputNumber } from "antd";
const ProductFields = () => {
  return (
    <>
      {/* <Col span={12}>
        <Form.Item name="itemsInStock" label="Items In Stock">
          <InputNumber min={0} />
        </Form.Item>
      </Col> */}
      <Col span={12}>
        <Form.Item name="minPreorderDays" label="Min Preorder Days">
          <InputNumber min={0} />
        </Form.Item>
      </Col>
    </>
  );
};

export default ProductFields;
