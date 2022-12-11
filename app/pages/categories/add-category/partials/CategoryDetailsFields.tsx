import { Col, Upload, Form, Input, InputNumber, Select, Switch } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const CategoryDetailsFields = () => {
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
      <Col span={12}>
        <Form.Item name="sortOrder" label="Sort Order">
          <InputNumber min={0} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="active" label="Active" initialValue={true}>
          <Switch />
        </Form.Item>
      </Col>
    </>
  );
};

export default CategoryDetailsFields;
