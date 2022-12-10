import AddNewTag from "./partials/AddNewTagFields";
import Availibility from "./partials/Availibility";
import { Row, Col, Button, Form } from "antd";
import { AddCouponWrapper } from "../styles";
import { useAppDispatch } from "~/hooks/Store";
import { CreateTagAction } from "~/redux/app/actions/tags";

export default function CouponForm({ selectedTag, setTagDrawerOpen }: any) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    dispatch(CreateTagAction(values, setTagDrawerOpen));
  };

  return (
    <AddCouponWrapper>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <AddNewTag selectedTag={selectedTag} />
          <Availibility />

          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddCouponWrapper>
  );
}
