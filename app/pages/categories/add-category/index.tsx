import { useEffect } from "react";
import CategoryDetailsFields from "./partials/CategoryDetailsFields";
import { Row, Col, Button, Form } from "antd";
import { AddCategoryWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";
import { CreateCategoryAction } from "~/redux/app/actions/category";

export default function CategoryForm({
  selectedCategory,
  setCategoryDrawerOpen,
}: any) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue(selectedCategory);
    }
  }, [selectedCategory, form]);

  const onSubmit = async (data: any) => {
    dispatch(CreateCategoryAction(data, setCategoryDrawerOpen));
  };

  return (
    <AddCategoryWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <CategoryDetailsFields />
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </AddCategoryWrapper>
  );
}
