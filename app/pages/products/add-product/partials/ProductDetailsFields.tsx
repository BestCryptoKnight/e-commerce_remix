import { Col, Upload, Form, Input, InputNumber, Select, Switch } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "urql";
import { GetCategories } from "~/graphql/queries/categories";
import type { CategoryType } from "~/types/categories";

const ProductDetailsFields = ({
  selectedProduct,
  descriptionRef,
  arabicDescriptionRef,
}: any) => {
  const [catgoriesResult] = useQuery<{ getCategories: CategoryType[] }>({
    query: GetCategories,
    variables: {
      vendorId: "63900eb5788c2b789fe57cb3",
    },
  });

  const { data: categories } = catgoriesResult;

  return (
    <>
      <Col span={12}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter the title...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="title_ar"
          label="Arabic Title"
          rules={[
            {
              required: true,
              message: "Please enter the arabic title...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select the category...!",
            },
          ]}
        >
          <Select
            options={(categories?.getCategories || []).map(
              (t: CategoryType) => ({
                value: t.id,
                label: t.title,
              })
            )}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please enter the price...!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="sku"
          label="Product SKU"
          rules={[
            {
              required: true,
              message: "Please enter the sku...!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="minPreorderDays" label="Min Preorder Days">
          <InputNumber min={0} />
        </Form.Item>
      </Col>
      <Col span={12} className="mb-24">
        <h3>Description</h3>

        <Editor
          onInit={(evt, editor) => {
            if (descriptionRef) return (descriptionRef.current = editor);
          }}
          initialValue={
            selectedProduct?.description ? selectedProduct?.description : ""
          }
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
      <Col span={12} className="mb-24">
        <h3>Arabic Description</h3>

        <Editor
          onInit={(evt, editor) => (arabicDescriptionRef.current = editor)}
          initialValue={
            selectedProduct?.description_ar
              ? selectedProduct?.description_ar
              : ""
          }
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

      <Col span={24}>
        <Form.Item name="avatar" label="Product Image">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
          >
            <>
              {false ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </>
          </Upload>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="active" label="Active" initialValue={true}>
          <Switch />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="type"
          label="Product Type"
          rules={[
            {
              required: true,
              message: "Please select the product type..!",
            },
          ]}
        >
          <Select
            options={[
              { label: "Product", value: "PRODUCT" },
              { label: "Service", value: "SERVICE" },
              { label: "Workshop", value: "WORKSHOP" },
            ]}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default ProductDetailsFields;
