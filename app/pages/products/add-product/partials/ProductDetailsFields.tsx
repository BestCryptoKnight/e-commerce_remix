import { useState } from "react";
import { Col, Form, Select, Switch } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "urql";
import { GetCategories } from "~/graphql/queries/categories";
import type { CategoryType } from "~/types/categories";
import Cookies from "universal-cookie";
import { GetVariants } from "~/graphql/queries/variants";
import type { UploadProps } from "antd";
import Drawer from "~/components/shared/drawer";
import VariantForm from "~/pages/variants/variant-actions";
import type { VariantTypes } from "~/types/variants";
const cookies = new Cookies();
const ProductDetailsFields = ({
  selectedProduct,
  descriptionRef,
  arabicDescriptionRef,
}: any) => {
  const [file, setFile] = useState<any>(null);

  const [variantDrawerOpen, setVariantDrawerOpen] = useState(false);
  const [catgoriesResult] = useQuery<{ getCategories: CategoryType[] }>({
    query: GetCategories,
    variables: {
      vendorId: cookies.get("vendorId"),
    },
  });

  const [variantsResult] = useQuery<{ getVariants: VariantTypes[] }>({
    query: GetVariants,
    variables: {
      vendorId: cookies.get("vendorId"),
    },
  });

  console.log(variantsResult);

  const { data: variants } = variantsResult;

  const { data: categories } = catgoriesResult;

  const uploadProps: UploadProps = {
    multiple: false,
    accept: ".jpeg, .png",
    maxCount: 1,

    onRemove: () => {
      setFile(null);
      console.log("onRemove called");

      return true;
    },
    customRequest: ({ file, onSuccess }: any) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    beforeUpload: (file: any) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFile(e.target.result);
      };

      reader.readAsDataURL(file);

      // Prevent upload
      return false;
    },
  };

  return (
    <>
      <Col span={24}>
        <Form.Item name="active" label="Active" initialValue={true}>
          <Switch />
        </Form.Item>
      </Col>

      <Col span={12}>
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

      <Col span={24}>
        <Form.Item
          name="variantId"
          label={
            <div className="flex w-full justify-between">
              <span>Variants</span>
              <span
                className="add-variant"
                onClick={(e) => {
                  setVariantDrawerOpen(true);
                  e.preventDefault();
                }}
              >
                Add new variants
              </span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please select a variant...!",
            },
          ]}
        >
          <Select
            mode="tags"
            options={(variants?.getVariants || []).map((t) => ({
              value: t.id,
              label: t.title,
            }))}
          />
        </Form.Item>
      </Col>

      <Col span={12} className="mb-10">
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
      <Col span={12} className="mb-10">
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
      <Drawer
        title="Add new variant"
        width="50%"
        size="large"
        open={variantDrawerOpen}
        onClose={() => setVariantDrawerOpen(false)}
        placement="top"
      >
        <VariantForm
          setVariantDrawerOpen={setVariantDrawerOpen}
          screen="product"
        />
      </Drawer>
    </>
  );
};

export default ProductDetailsFields;
