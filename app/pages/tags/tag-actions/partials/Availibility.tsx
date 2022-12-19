/* eslint-disable react/jsx-key */
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Col, TimePicker, Select } from "antd";

const Availibility = () => {
  return (
    <>
      <Col span={24}>
        <Form.List name="workdays">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="flex">
                  <Col span={8}>
                    <Form.Item>
                      <Form.Item
                        {...field}
                        label="Day"
                        name={[field.name, "day"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the day..!",
                          },
                        ]}
                      >
                        <Select
                          options={[
                            { label: "Monday", value: "Monday" },
                            { label: "Tuesday", value: "Tuesday" },
                            { label: "Wednesday", value: "Wednesday" },
                            { label: "Thursday", value: "Thursday" },
                            { label: "Friday", value: "Friday" },
                            { label: "Saturday", value: "Saturday" },
                            { label: "Sunday", value: "Sunday" },
                          ]}
                        ></Select>
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      label="Start time"
                      name={[field.name, "startTime"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select the start time...!",
                        },
                      ]}
                    >
                      <TimePicker minuteStep={15} format="HH:mm" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      label="End time"
                      name={[field.name, "endTime"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select the start time...!",
                        },
                      ]}
                    >
                      <TimePicker minuteStep={15} format="HH:mm" />
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
                  Add Availibility
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    </>
  );
};

export default Availibility;
