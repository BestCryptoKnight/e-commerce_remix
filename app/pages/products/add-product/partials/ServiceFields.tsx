import { Col, Form, Input, Switch, DatePicker, Select } from "antd";
import GeoLocation from "~/components/shared/geo-location";
import type { ServiceFieldsProps } from "../../products.types";
import { useQuery } from "urql";
import { getTags } from "~/graphql/queries/tags";

const ServiceFields: React.FC<ServiceFieldsProps> = ({
  attendanceType,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [tagsResult] = useQuery({
    query: getTags,
    variables: {
      vendorId: "63900eb5788c2b789fe57cb3",
    },
  });

  const { data: tags } = tagsResult;

  return (
    <>
      <Col span={12}>
        <Form.Item name="tagIds" label="Tag">
          <Select
            options={(tags?.getTags || []).map((t: any) => ({
              value: t.id,
              label: t.title,
            }))}
          ></Select>
        </Form.Item>
      </Col>

      {/* <Col span={12}>
        <Form.Item name="duration" label="Duration">
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Col> */}

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
            />
          </>
        )}
      </Col>
      <Col span={6}>
        <Form.Item name="end_time" label="End Time">
          <Switch />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="customer_location" label="Customer location">
          <Switch />
        </Form.Item>
      </Col>
    </>
  );
};

export default ServiceFields;
