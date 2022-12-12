import { Row, Col, Button, Upload, Form, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export default function ProductForm() {
  const onSubmit = async (data: any) => {};

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Row gutter={24}>
        <Col span={24}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            <div>
              {false ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload logo</div>
            </div>
          </Upload>
        </Col>

        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter the name...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter the email...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contact_name"
            label="Contact Name"
            rules={[
              {
                required: true,
                message: "Please enter the Contact Name...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contact_phone_number"
            label="Contact phone number"
            rules={[
              {
                required: true,
                message: "Please enter the Contact phone number...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="business_phone_number"
            label="Business phone number"
            rules={[
              {
                required: true,
                message: "Please enter the Contact phone number...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="store_location"
            label="Store Location"
            rules={[
              {
                required: true,
                message: "Please enter the Store Location...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <h4 className="form-label">Social media links</h4>
        </Col>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="instagram"
              label="Instagram"
              rules={[
                {
                  required: true,
                  message: "Please enter the Instagram...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="facebook"
              label="Facebook"
              rules={[
                {
                  required: true,
                  message: "Please enter the Facebook...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="snapchat"
              label="Snapchat"
              rules={[
                {
                  required: true,
                  message: "Please enter the Snapchat...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="whatsapp"
              label="Whatsapp"
              rules={[
                {
                  required: true,
                  message: "Please enter the Whatsapp...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Col span={12}>
          <Form.Item
            name="vat_number"
            label="VAT Number"
            rules={[
              {
                required: true,
                message: "Please enter the VAT Number...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cr_number"
            label="CR Number"
            rules={[
              {
                required: true,
                message: "Please enter the CR Number...!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <h4 className="form-label">
            Upload business certificates: allow for 5 different uploads{" "}
          </h4>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            <div>
              {false ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Col>

        <Col span={12}>
          <h4 className="form-label">Upload IBAN Certificate </h4>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            <div>
              {false ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Col>

        <br></br>

        <Col span={24}>
          <h4 className="form-label">Bank information fields</h4>
        </Col>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="iban_number"
              label="Iban Number"
              rules={[
                {
                  required: true,
                  message: "Please enter the Iban Number...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="account_number"
              label="Account Number"
              rules={[
                {
                  required: true,
                  message: "Please enter the Account Number...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="beneficiary_name"
              label="Beneficiary name"
              rules={[
                {
                  required: true,
                  message: "Please enter the Beneficiary name...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="bank_name"
              label="Bank Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the Bank Name...!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Col span={24}>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
