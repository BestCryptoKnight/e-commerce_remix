import { Col, Form, Input, Switch, Select } from "antd";
import GeoLocation from "~/components/shared/geo-location";
import type { ServiceFieldsProps } from "~/types/products";
import { useQuery } from "urql";
import { GetTags } from "~/graphql/queries/tags";
import type { TagsTypes } from "~/types/tags";

const ServiceFields: React.FC<ServiceFieldsProps> = ({
  attendanceType,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [tagsResult] = useQuery<{ getTags: TagsTypes[] }>({
    query: GetTags,
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
            options={(tags?.getTags || []).map((t: TagsTypes) => ({
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
              title="Location"
              required={true}
              name="location"
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
