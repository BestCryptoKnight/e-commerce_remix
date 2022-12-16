import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Col, Input, Upload, InputNumber } from "antd";

const VariantOptions = () => {
  return (
    <>
      <Col span={24}>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="mb-4 flex flex-wrap">
                  <Col span={24} className="mb-5">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                    >
                      <div style={{ marginTop: 8 }}>Upload Image</div>
                    </Upload>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      label="Title"
                      name={[field.name, "title"]}
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
                      {...field}
                      label="Title Arabic"
                      name={[field.name, "title_ar"]}
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
                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, "price"]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      label="SKU"
                      name={[field.name, "sku"]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Options
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    </>
  );
};

export default VariantOptions;
