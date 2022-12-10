import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Col, TimePicker } from "antd";
import DatePicker from "react-multi-date-picker";

const Availibility = () => {
  return (
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
                      label="Start time"
                      name={[field.name, "startTime"]}
                    >
                      <TimePicker />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      label="End time"
                      name={[field.name, "endTime"]}
                    >
                      <TimePicker />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area ||
                        prevValues.sights !== curValues.sights
                      }
                      key={field.key}
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Days"
                          name={[field.name, "days"]}
                        >
                          <DatePicker multiple={true} className="rmdp-input1" />
                        </Form.Item>
                      )}
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
