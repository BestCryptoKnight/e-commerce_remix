import { useRef } from "react";
import {
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Upload,
  InputNumber,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const [form] = Form.useForm();
  const descriptionRef = useRef<any>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  console.log(Form.useWatch("deliveryMethods", form));
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="deliveryMethods" label="Delivery Methods">
            <Select
              mode="multiple"
              options={[
                { label: "Mandoob", value: "MANDOOB" },
                { label: "Pickup", value: "PICKUP" },
                { label: "Smsa", value: "SMSA" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="paymentMethods" label="Payment Methods">
            <Select
              mode="multiple"
              options={[
                { label: "Bank Transfer", value: "BANK_TRANSFER" },
                { label: "Cash", value: "CASH" },
                { label: "Online", value: "ONLINE" },
                { label: "Store", value: "STORE" },
              ]}
            />
          </Form.Item>
        </Col>

        {Form.useWatch("deliveryMethods", form)?.includes("MANDOOB") && (
          // <>
          //   <Col span={12}>
          //     <Form.Item name="deliveryArea" label="Delivery Area">
          //       <Input.TextArea />
          //     </Form.Item>
          //   </Col>
          //   <Col span={12}>
          //     <Form.Item name="deliveryArea_ar" label="Delivery Area Arabic">
          //       <Input.TextArea />
          //     </Form.Item>
          //   </Col>
          // </>
          <>
            <Col span={24}>
              <Form.List name="availabilities">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div key={field.key} className="flex">
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            label="Delivery Area"
                            name={[field.name, "deliveryArea"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            label="Delivery Area Arabic"
                            name={[field.name, "deliveryArea_ar"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            {...field}
                            label="Price"
                            name={[field.name, "price"]}
                          >
                            <InputNumber />
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Delivery Area
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </>
        )}
        <br></br>

        <Col span={12} className="mb-24">
          <h4>Terms and conditions of vendor: </h4>

          <Editor
            onInit={(evt, editor) => {
              if (descriptionRef) return (descriptionRef.current = editor);
            }}
            initialValue={""}
            onChange={(evt, editor) => {
              console.log(evt);
              console.log(editor);
            }}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Col>
        <Col span={24}>
          <Form.Item name="avatar" label="Hero image for store">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >
              <>
                <div style={{ marginTop: 8 }}>Upload</div>
              </>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserProfile;
