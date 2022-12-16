import { useEffect, useState, useRef } from "react";
import ProductDetailsFields from "./partials/ProductDetailsFields";
import ProductFields from "./partials/ProductFields";
import ServiceFields from "./partials/ServiceFields";
import WorkShopFields from "./partials/WorkShopFields";
import { Row, Col, Button, Form } from "antd";
import { AddProductWrapper } from "../styles";
import { useAppDispatch } from "~/hooks/Store";
import { ProductsAction } from "~/redux/app/actions/product";
import { useQuery } from "urql";
import Cookies from "universal-cookie";
import { VariantTypes } from "~/types/variants";
import { GetVariants } from "~/graphql/queries/variants";
import {
  CreateVariantAction,
  GetVariantsAction,
} from "~/redux/app/actions/variants";
const cookies = new Cookies();

export default function ProductForm({
  selectedProduct,
  setProductDrawerOpen,
  selectedAction,
}: any) {
  const [selectedLocation, setSelectedLocation] = useState({
    field: "",
    location: "",
  });
  const [variantRes, setVariantRes] = useState({});
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const descriptionRef = useRef<any>(null);
  const arabicDescriptionRef = useRef<any>(null);

  const [variantsResult] = useQuery<{ getVariants: VariantTypes[] }>({
    query: GetVariants,
    variables: {
      vendorId: cookies.get("vendorId"),
    },
  });

  console.log(variantsResult);

  const { data: variants } = variantsResult;

  useEffect(() => {
    if (selectedAction == "edit-product") {
      form.setFieldsValue(selectedProduct);
    } else {
      form.resetFields();
    }
  }, [selectedProduct, form, selectedAction]);

  useEffect(() => {
    form.setFieldValue("location", selectedLocation.location);
  }, [selectedLocation, form]);

  console.log("varittttt", variantRes);

  const onSubmit = async (data: any) => {
    data.description = descriptionRef?.current?.targetElm?.value;
    data.description_ar = arabicDescriptionRef?.current?.targetElm?.value;

    const variantOptions = {
      options: data?.options,
      title: "test",
      title_ar: "test2",
    };

    console.log("data", data);

    if (true) {
      dispatch(CreateVariantAction(variantOptions, "", true, setVariantRes));
    }

    const payload = {
      ...data,
      variants: variantRes,
    };

    console.log("payload", payload);

    return;
    if (selectedAction == "edit-product") {
      dispatch(
        ProductsAction(
          data,
          setProductDrawerOpen,
          selectedAction,
          selectedProduct.id
        )
      );
    } else {
      dispatch(ProductsAction(data, setProductDrawerOpen, selectedAction, ""));
    }
  };

  const attendanceType: string = Form.useWatch("attendanceType", form);

  return (
    <AddProductWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <ProductDetailsFields
            variants={variants}
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
