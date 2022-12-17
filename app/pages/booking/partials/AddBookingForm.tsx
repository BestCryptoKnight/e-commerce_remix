/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button, Row, Col, DatePicker, Form, Input, Select } from "antd";
import { BookingCalendarDateWrapper } from "../styles";
import { useQuery } from "urql";
import Cookies from "universal-cookie";
import { GetFilterProducts } from "~/graphql/queries/products";
import type { ProductType } from "~/types/products";

const AddBookingForm = ({ form }: any) => {
  const cookies = new Cookies();
  const [selectedService, setSelectedService] = useState("");

  const [services] = useQuery<{ getProducts: { list: ProductType[] } }>({
    query: GetFilterProducts,
    variables: {
      // vendorId: cookies.get("vendorId"),
      vendorId: "638e6e77898a05f954ca1cc3",
      type: "SERVICE",
      field: "type",
    },
  });
  console.log(
    services?.data?.getProducts.list.filter(
      (item) => item.id === selectedService
    )
  );
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
          label="Customer full name "
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter the full name...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="phoneNumber"
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
        <BookingCalendarDateWrapper>
          <Form.Item
            name="startTime"
            label="Start time"
            rules={[
              {
                required: true,
                message: "Please select the data and time...!",
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </BookingCalendarDateWrapper>
      </Col>
      <Col span={12}>
        <BookingCalendarDateWrapper>
          <Form.Item
            name="endTime"
            label="End time"
            rules={[
              {
                required: true,
                message: "Please select the data and time...!",
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </BookingCalendarDateWrapper>
      </Col>

      <Col span={12}>
        <Form.Item
          name="service"
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
            options={(services?.data?.getProducts.list || []).map(
              (t: ProductType) => ({
                value: t.id,
                label: t.title,
              })
            )}
          ></Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select a tag.",
            },
          ]}
        >
          <Select
            options={(services?.data?.getProducts.list || [])
              .find((item) => item.id === selectedService)
              ?.Tags.map((t: any) => ({
                value: t.id,
                label: t.title,
              }))}
          ></Select>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Col>
    </Row>
  );
};

export default AddBookingForm;
