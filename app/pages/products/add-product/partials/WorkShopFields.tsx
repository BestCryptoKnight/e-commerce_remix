import { Col, Form, Input, DatePicker, Select, InputNumber } from "antd";
import GeoLocation from "~/components/shared/geo-location";
import type { ServiceFieldsProps } from "~/types/products";
import { useQuery } from "urql";
import { GetTags } from "~/graphql/queries/tags";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const WorkShopFields = ({
  attendanceType,
  selectedLocation,
  setSelectedLocation,
}: ServiceFieldsProps) => {
  const [tagsResult] = useQuery({
    query: GetTags,
    variables: {
      vendorId: cookies.get("vendorId"),
    },
  });

  const { data: tags } = tagsResult;

  return (
    <>
      {/* <Col span={12}>
        <Form.Item name="noOfSeats" label="Items In Stock">
          <InputNumber min={0} />
        </Form.Item>
      </Col> */}
      <Col span={12}>
        <Form.Item name="maxSeats" label="Maximum number of seats">
          <InputNumber min={0} />
        </Form.Item>
      </Col>
      {/* <Col span={12}>
        <Form.Item name="tags" label="Tag">
          <Select
            mode="multiple"
            options={(tags?.getTags || []).map((t: any) => ({
              value: t.id,
              label: t.title,
            }))}
          ></Select>
        </Form.Item>
      </Col> */}
      <Col span={12}>
        <Form.Item
          name="date/time"
          label="Date/Time"
          rules={[
            {
              required: true,
              message: "Please select the data and time...!",
            },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="attendanceType" label="Attendance Type">
          <Select
            options={[
              { label: "Online", value: "Online" },
              { label: "Physical", value: "Physical" },
            ]}
          ></Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        {attendanceType === "Online" ? (
          <Form.Item
            name="meeting_link"
            label="Meeting Link"
            rules={[
              {
                required: true,
                message: "Please enter the arabic title...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <GeoLocation
              selectedLocation={selectedLocation.location}
              handleChange={(address) =>
                setSelectedLocation({ ...selectedLocation, location: address })
              }
              handleSelect={(address) =>
                setSelectedLocation({ ...selectedLocation, location: address })
              }
              title="Location"
              required={true}
              name="location"
            />
          </>
        )}
      </Col>
    </>
  );
};

export default WorkShopFields;
