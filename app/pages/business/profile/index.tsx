import {
  Row,
  Col,
  Button,
  Upload,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { BusinessProfileWrapper } from "./styles";
import { UpdateVendorAction } from "~/redux/app/actions/business";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as StateLoading } from "~/redux/app";

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(StateLoading);
  const { TextArea } = Input;
  const onSubmit = async (data: any) => {
    dispatch(UpdateVendorAction(data));
  };

  return (
    <BusinessProfileWrapper>
      <Form onFinish={onSubmit} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="addressUrl" label="Address URL">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="contact_name" label="Contact Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone" label="Contact phone number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="business_phone_number"
              label="Business phone number"
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="store_location" label="Store Location">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="vat_number" label="VAT Number">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="cr_number" label="CR Number">
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="deliveryMethods" label="Delivery Methods">
              <Select
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
                options={[
                  { label: "Bank Transfer", value: "BANK_TRANSFER" },
                  { label: "Cash", value: "CASH" },
                  { label: "Online", value: "ONLINE" },
                  { label: "Store", value: "STORE" },
                ]}
              />
            </Form.Item>
          </Col>
          <br></br>

          <Col span={24}>
            <h4 className="form-label">Bank information fields</h4>
          </Col>

          <Col span={6}>
            <Form.Item name="iban" label="Iban Number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="accountNumber" label="Account Number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="beneficiary" label="Beneficiary name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="bankName" label="Bank Name">
              <Input />
            </Form.Item>
          </Col>

          <br></br>
          <Col span={24}>
            <h4 className="form-label">Social media links</h4>
          </Col>

          {/* <Row gutter={24}> */}
          <Col span={6}>
            <Form.Item name="instagram" label="Instagram">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="facebook" label="Facebook">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="snapchat" label="Snapchat">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="whatsapp" label="Whatsapp">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="description_ar" label="Arabic Description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="terms" label="Terms">
              <TextArea rows={4} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <h4 className="form-label">
              Upload business certificates: allow for 5 different uploads{" "}
            </h4>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >
              <div>
                {false ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Col>

          <Col span={8}>
            <h4 className="form-label">Upload IBAN Certificate </h4>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >
              <div>
                {false ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Col>

          <Col span={8}>
            <h4 className="form-label">Upload Avatar</h4>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
            >
              <div>
                {false ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload logo</div>
              </div>
            </Upload>
          </Col>
          {/* </Row> */}

          <Col span={24}>
            <Button type="primary" htmlType="submit" loading={loading}>
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </BusinessProfileWrapper>
  );
}
