import { useEffect } from "react";
import CategoryDetailsFields from "./partials/CategoryDetailsFields";
import { Row, Col, Button, Form } from "antd";
import { AddCategoryWrapper } from "./styles";
import { useAppDispatch } from "~/hooks/Store";
import { CategoryAction } from "~/redux/app/actions/category";

export default function CategoryForm({
  active,
  setActive,
  selectedCategory,
  setCategoryDrawerOpen,
  selectedAction,
}: any) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue(selectedCategory);
    }
  }, [selectedCategory, form]);

  const onSubmit = async (data: any) => {
    const payload = { ...data, active };
    if (selectedAction === "edit-category") {
      dispatch(
        CategoryAction(
          payload,
          setCategoryDrawerOpen,
          selectedAction,
          selectedCategory.id
        )
      );
    } else {
      dispatch(
        CategoryAction(payload, setCategoryDrawerOpen, selectedAction, "")
      );
    }
  };

  return (
    <AddCategoryWrapper>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Row gutter={24}>
          <CategoryDetailsFields active={active} setActive={setActive} />
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
