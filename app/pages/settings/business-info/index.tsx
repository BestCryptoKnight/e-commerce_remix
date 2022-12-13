import { useRef, useState, useEffect } from "react";
import { Row, Col, Button, Upload, Form, Input, InputNumber } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { BusinessProfileWrapper } from "./styles";
import { UpdateVendorAction } from "~/redux/app/actions/business";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { loading as StateLoading } from "~/redux/app";
import type { UpdateVendorForm } from "~/types/vendors";
import { Editor } from "@tinymce/tinymce-react";
import GeoLocation from "~/components/shared/geo-location";

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const loading = useAppSelector(StateLoading);
  const [storeLocation, setStoreLocation] = useState("");
  const descriptionRef = useRef<any>(null);
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldValue("storeLocation", storeLocation);
  }, [storeLocation, form]);

  const onSubmit = async (data: UpdateVendorForm) => {
    data.terms = descriptionRef?.current?.targetElm?.value;
    data.storeLocation = storeLocation;
    data.address = storeLocation;
    data.addressUrl = storeLocation;
    dispatch(UpdateVendorAction(data));
  };

  return (
    <BusinessProfileWrapper>
      <Form onFinish={onSubmit} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="business_phone_number"
              label="Business phone number"
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <GeoLocation
              selectedLocation={storeLocation}
              handleChange={(address) => setStoreLocation(address)}
              handleSelect={(address) => setStoreLocation(address)}
              title="Store Location"
              required={false}
              name="storeLocation"
            />
          </Col>
          <Col span={12}>
            <Form.Item name="vatNumber" label="VAT Number">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="crNumber" label="CR Number">
              <InputNumber />
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
              <TextArea rows={8} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="description_ar" label="Arabic Description">
              <TextArea rows={8} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <h4>Terms and conditions of vendor: </h4>
            <Editor
              onInit={(evt, editor) => {
                if (descriptionRef) return (descriptionRef.current = editor);
              }}
              initialValue={""}
              onChange={(evt, editor) => {
                console.log(evt);
                console.log(editor);
              }}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
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
