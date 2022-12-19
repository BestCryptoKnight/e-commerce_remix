import { Col, Form, Input, Switch } from "antd";

const AddTagsFields = () => {
  return (
    <>
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
        <Form.Item name="active" label="Active">
          <Switch />
        </Form.Item>
      </Col>
    </>
  );
};

export default AddTagsFields;
