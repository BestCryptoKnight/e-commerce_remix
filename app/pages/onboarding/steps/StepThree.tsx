import { Form, Col, Button, Radio, Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

export default function StepThree() {
  const certificates = [
    "Maroof",
    "CR",
    "Freelance Certificate",
    "None of the above",
  ];

  const onFinish = () => {};
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="requiredMarkValue" label="Are you a">
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Active Business</Radio.Button>
          <Radio.Button value="b">
            New Business (less than 6 months since go live)
          </Radio.Button>
          <Radio.Button value="c">
            Upcoming Business (less than 6 months before you go live)
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* // */}

      <Form.Item
        label="What is your average daily sales volume? (This is the number of your daily transactions. If you are an upcoming business, you can write expected volume or select unknown from the list)"
        name="requiredMarkValue"
      >
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a"> less than 10</Radio.Button>
          <Radio.Button value="b">11-100</Radio.Button>
          <Radio.Button value="c">101-1000</Radio.Button>
          <Radio.Button value="c">1001+</Radio.Button>
          <Radio.Button value="c">Unknown</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="What is/will be the average cost of your products and/or services?"
        name="requiredMarkValue"
      >
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">less than 100 SAR</Radio.Button>
          <Radio.Button value="b">100 - 1000 SAR</Radio.Button>
          <Radio.Button value="c">1001 - 10000 SAR+</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Do you have any of the following Approved Business Registrations within KSA?"
        name="requiredMarkValue"
      >
        <Checkbox.Group
          options={certificates}
          defaultValue={["Apple"]}
          onChange={onChange}
        />
      </Form.Item>

      <Col span={6}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Col>
    </Form>
  );
}
