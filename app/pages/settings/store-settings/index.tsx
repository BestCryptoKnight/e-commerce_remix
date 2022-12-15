import {
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Upload,
  InputNumber,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { UpdateVendorAction } from "~/redux/app/actions/vendors";
import { useAppDispatch } from "~/hooks/Store";

const UserProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(UpdateVendorAction(values));
  };

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
          <>
            <Col span={24}>
              <Form.List name="deliveryAreas">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div key={field.key} className="flex">
                        <Col span={7}>
                          <Form.Item
                            {...field}
                            label="Label"
                            name={[field.name, "label"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...field}
                            label="Label Arabic"
                            name={[field.name, "label_ar"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={7}>
                          <Form.Item
                            {...field}
                            label="Price"
                            name={[field.name, "charge"]}
                          >
                            <InputNumber />
                          </Form.Item>
                        </Col>

                        <Col span={3}>
                          <Form.Item
                            {...field}
                            label="Active"
                            name={[field.name, "active"]}
                          >
                            <Switch />
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
