import { useEffect, useState, useRef } from "react";
import ProductDetailsFields from "./partials/ProductDetailsFields";
import ProductFields from "./partials/ProductFields";
import ServiceFields from "./partials/ServiceFields";
import WorkShopFields from "./partials/WorkShopFields";
import { Row, Col, Button, Form } from "antd";
import { AddProductWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";
import { CreateProductsAction } from "~/redux/app/actions/product";

export default function ProductForm({
  selectedProduct,
  setProductDrawerOpen,
}: any) {
  const [selectedLocation, setSelectedLocation] = useState({
    field: "",
    location: "",
  });
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const descriptionRef = useRef<any>(null);
  const arabicDescriptionRef = useRef<any>(null);

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct, form]);

  useEffect(() => {
    form.setFieldValue("location", selectedLocation.location);
  }, [selectedLocation, form]);

  const onSubmit = async (data: any) => {
    data.description = data?.description?.target?.targetElm?.value;
    data.description_ar = data?.description_ar?.target?.targetElm?.value;
    dispatch(CreateProductsAction(data, setProductDrawerOpen));
  };

  const attendanceType: string = Form.useWatch("attendanceType", form);

  return (
    <AddProductWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <ProductDetailsFields
            selectedProduct={selectedProduct}
            descriptionRef={descriptionRef}
            arabicDescriptionRef={arabicDescriptionRef}
          />
          {Form.useWatch("type", form) === "PRODUCT" && <ProductFields />}
          {Form.useWatch("type", form) === "SERVICE" && (
            <ServiceFields
              attendanceType={attendanceType}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          )}

          {Form.useWatch("type", form) === "WORKSHOP" && (
            <WorkShopFields
              attendanceType={attendanceType}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          )}
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddProductWrapper>
  );
}
