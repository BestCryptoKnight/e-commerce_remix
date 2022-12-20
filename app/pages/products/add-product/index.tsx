import { useEffect, useState, useRef } from "react";
import ProductDetailsFields from "./partials/ProductDetailsFields";
import ProductFields from "./partials/ProductFields";
import ServiceFields from "./partials/ServiceFields";
import WorkShopFields from "./partials/WorkShopFields";
import { Row, Col, Button, Form } from "antd";
import { AddProductWrapper } from "../styles";
import { useAppDispatch } from "~/hooks/Store";
import { ProductsAction } from "~/redux/app/actions/product";

export default function ProductForm({
  totalCount,
  setSelectedProduct,
  selectedProduct,
  setProductDrawerOpen,
  selectedAction,
}: any) {
  const [selectedLocation, setSelectedLocation] = useState({
    field: "",
    location: "",
  });
  const [addOptions, setAddOptions] = useState(false);
  const [active, setActive] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const descriptionRef = useRef<any>(null);
  const arabicDescriptionRef = useRef<any>(null);

  useEffect(() => {
    if (selectedAction === "edit-product") {
      form.setFieldsValue(selectedProduct);
    } else {
      form.resetFields();
      setSelectedProduct(null);
    }
  }, [selectedProduct, form, selectedAction]);

  useEffect(() => {
    form.setFieldValue("location", selectedLocation.location);
  }, [selectedLocation, form]);

  const onSubmit = async (data: any) => {
    data.description = descriptionRef?.current?.targetElm?.value;
    data.description_ar = arabicDescriptionRef?.current?.targetElm?.value;

    const { price, sku, ...dataRest } = data;

    const formattedData = {
      ...dataRest,
      active,
      variants: [
        {
          default: true,
          price: data?.price,
          sku: data?.sku,
          title: data?.title,
          title_ar: data?.title_ar,
        },
      ],
    };

    const payload = addOptions ? { ...data, active } : formattedData;

    if (selectedAction == "edit-product") {
      dispatch(
        ProductsAction(
          payload,
          setProductDrawerOpen,
          selectedAction,
          selectedProduct.id,
          totalCount
        )
      );
    } else {
      dispatch(
        ProductsAction(
          payload,
          setProductDrawerOpen,
          selectedAction,
          "",
          totalCount
        )
      );
    }

    form.resetFields();
    setSelectedProduct(null);
  };

  const attendanceType: string = Form.useWatch("attendanceType", form);

  return (
    <AddProductWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <ProductDetailsFields
            active={active}
            setActive={setActive}
            setAddOptions={setAddOptions}
            addOptions={addOptions}
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
