import { useEffect, useState, useRef } from "react";
import CouponDetailsFields from "./partials/CouponDetailsFields";

import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";
import { AddProductsAction } from "~/redux/app/actions/product";

export default function CouponForm({
  selectedCoupon,
  setCouponDrawerOpen,
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
    if (selectedCoupon) {
      form.setFieldsValue(selectedCoupon);
    }
  }, [selectedCoupon, form]);

  useEffect(() => {
    form.setFieldValue("location", selectedLocation.location);
  }, [selectedLocation, form]);

  const onSubmit = async (data: any) => {
    data.description = data?.description?.target?.targetElm?.value;
    data.description_ar = data?.description_ar?.target?.targetElm?.value;
    dispatch(AddProductsAction(data, setCouponDrawerOpen));
  };

  const attendanceType: string = Form.useWatch("attendanceType", form);

  return (
    <AddCouponWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <CouponDetailsFields
            selectedCoupon={selectedCoupon}
            descriptionRef={descriptionRef}
            arabicDescriptionRef={arabicDescriptionRef}
          />

          <Col span={24}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddCouponWrapper>
  );
}
