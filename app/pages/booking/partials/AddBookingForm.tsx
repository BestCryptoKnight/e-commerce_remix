/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button, Row, Col, DatePicker, Form, Input, Select } from "antd";
import { BookingCalendarDateWrapper } from "../styles";
import { useQuery } from "urql";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { GetFilterProducts } from "~/graphql/queries/products";
import type { ProductType } from "~/types/products";
import { loading as stateLoading } from "~/redux/app";
import { useAppSelector } from "~/hooks/Store";
const AddBookingForm = ({ form }: any) => {
  const cookies = new Cookies();
  const [selectedService, setSelectedService] = useState("");
  const loading = useAppSelector(stateLoading);
  const [services] = useQuery<{ getProducts: { list: ProductType[] } }>({
    query: GetFilterProducts,
    variables: {
      vendorId: cookies.get("vendorId"),
      type: "SERVICE",
    },
  });

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          label="Title of booking"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title of the booking...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Customer first name "
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter the first name...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Customer last name "
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter the last name...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label="Customer phone number "
          rules={[
            {
              required: true,
              message: "Please enter the customer phone number...!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="Customer email "
          rules={[
            {
              required: true,
              message: "Please enter the customer email address...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="productId"
          label="Services"
          rules={[
            {
              required: true,
              message: "Please select a service.",
            },
          ]}
        >
          <Select
            onChange={(e) => setSelectedService(e)}
            options={(services?.data?.getProducts?.list || []).map(
              (t: ProductType) => ({
                value: t.id,
                label: t.title,
              })
            )}
          ></Select>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="tagId"
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select a tag.",
            },
          ]}
        >
          <Select
            options={(services?.data?.getProducts?.list || [])
              .find((item) => item.id === selectedService)
              ?.tags?.map((t: any) => ({
                value: t.id,
                label: t.title,
              }))}
          ></Select>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.List name="slots">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="flex">
                  <Col span={12}>
                    <BookingCalendarDateWrapper>
                      <Form.Item
                        {...field}
                        label="Start time"
                        name={[field.name, "from"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the start time...!",
                          },
                        ]}
                      >
                        <DatePicker
                          showTime
                          minuteStep={15}
                          format="YYYY-MM-DD HH:mm"
                        />
                      </Form.Item>
                    </BookingCalendarDateWrapper>
                  </Col>
                  <Col span={12}>
                    <BookingCalendarDateWrapper>
                      <Form.Item
                        {...field}
                        label="End time"
                        name={[field.name, "to"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the start time...!",
                          },
                        ]}
                      >
                        <DatePicker
                          showTime
                          minuteStep={15}
                          format="YYYY-MM-DD HH:mm"
                        />
                      </Form.Item>
                    </BookingCalendarDateWrapper>
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
                  Add Slot
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>

      <Col span={24}>
        <Button type="primary" htmlType="submit" loading={loading}>
          submit
        </Button>
      </Col>
    </Row>
  );
};

export default AddBookingForm;
