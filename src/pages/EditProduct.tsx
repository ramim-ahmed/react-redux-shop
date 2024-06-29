import {
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Typography,
  Rate,
  Card,
  Spin,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
import { CgSpinner } from "react-icons/cg";

import { TProduct } from "../types";
import { useEffect, useState } from "react";
import { useFetchCategoriesQuery } from "../app/features/category/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchSingleProductQuery,
  useUpdateProductMutation,
} from "../app/features/product/productApi";
import { MdKeyboardBackspace } from "react-icons/md";
import toast from "react-hot-toast";

type RouteParams = {
  id: string;
};
export default function EditProduct() {
  const { id } = useParams<RouteParams>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: initialData, isLoading: productFetchLoading } =
    useFetchSingleProductQuery(id);
  const { data: categories, isLoading: categoriesLoading } =
    useFetchCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [tagsInput, setTagsInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleAddTag = () => {
    setSelectedTags([...selectedTags, tagsInput]);
  };

  const handleAddImage = () => {
    setSelectedImages([...selectedImages, imageInput]);
  };

  const handleChange = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (initialData) {
      setSelectedImages(initialData.images);
      setSelectedTags(initialData.tags);
    }
  }, [initialData]);

  if (categoriesLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Spin />
      </div>
    );
  }

  if (productFetchLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Spin />
      </div>
    );
  }

  const categoriesOptons = categories?.map((item) => {
    return {
      value: item.slug,
      label: item.name,
    };
  });

  const onFinish = async (values: Partial<TProduct>) => {
    setLoading(true);
    const data = {
      ...values,
      category: selectedCategory || initialData?.category,
      tags: selectedTags,
      images: selectedImages,
    };
    try {
      const result = await updateProduct({ id, data }).unwrap();
      toast.success("Product Edited Successfully");
      console.log(result);
      setLoading(false);
    } catch (error) {
      toast.error("Product Edited Failed!!");
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1 || "/");
  };

  return (
    <div>
      <div
        onClick={handleGoBack}
        className="cursor-pointer pt-3 space-x-2 flex items-center"
      >
        <p>
          <MdKeyboardBackspace className="w-6 h-6" />
        </p>
        <p>Go Back</p>
      </div>
      <Form
        className="mt-4"
        form={form}
        initialValues={initialData}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="thumbnail" label="Thumbnail">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Select
          className="w-full"
          defaultValue={initialData?.category}
          onChange={handleChange}
          options={categoriesOptons}
        />

        <Form.Item name="price" label="Price">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="discountPercentage" label="Discount Percentage">
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item name="rating" label="Rating">
          <Rate allowHalf />
        </Form.Item>
        <Form.Item name="stock" label="Stock">
          <InputNumber min={0} />
        </Form.Item>
        <div>
          <Form.Item label="Tags">
            <Input
              placeholder="write product tag"
              onChange={(e) => setTagsInput(e.target.value)}
            />
            <Button className="mt-1" onClick={handleAddTag}>
              Add Tags
            </Button>
          </Form.Item>
          <div className="flex items-center space-x-3">
            {selectedTags.map((tag, index) => (
              <p className="bg-white p-1" key={index}>
                #{tag}
              </p>
            ))}
          </div>
        </div>
        <Form.Item name="brand" label="Brand">
          <Input />
        </Form.Item>
        <Form.Item name="sku" label="SKU">
          <Input />
        </Form.Item>
        <Form.Item name="weight" label="Weight">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Dimensions">
          <Space>
            <Form.Item name={["dimensions", "width"]} label="Width">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name={["dimensions", "height"]} label="Height">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name={["dimensions", "depth"]} label="Depth">
              <InputNumber min={0} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="warrantyInformation" label="Warranty Information">
          <Input />
        </Form.Item>
        <Form.Item name="shippingInformation" label="Shipping Information">
          <Input />
        </Form.Item>
        <Form.Item name="availabilityStatus" label="Availability Status">
          <Input />
        </Form.Item>
        <Form.Item name="returnPolicy" label="Return Policy">
          <Input />
        </Form.Item>
        <Form.Item name="minimumOrderQuantity" label="Minimum Order Quantity">
          <InputNumber min={0} />
        </Form.Item>

        <div>
          <Form.Item label="Images">
            <Input
              placeholder="paste image url"
              onChange={(e) => setImageInput(e.target.value)}
            />
            <Button className="mt-1" onClick={handleAddImage}>
              Add Image
            </Button>
          </Form.Item>
          <div className="flex items-center space-x-3">
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                className="w-20 object-cover"
                alt=""
              />
            ))}
          </div>
        </div>

        <Title level={3}>Reviews</Title>
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} style={{ marginBottom: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    label="Rating"
                  >
                    <Rate allowHalf />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    label="Comment"
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    label="Reviewer Name"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerEmail"]}
                    label="Reviewer Email"
                  >
                    <Input />
                  </Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => remove(name)}
                    icon={<MinusCircleOutlined />}
                    style={{ width: "100%" }}
                  >
                    Remove Review
                  </Button>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
              >
                Add Review
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item className="mt-2">
          <Button type="primary" htmlType="submit">
            {loading ? (
              <p className="flex items-center space-x-1">
                <CgSpinner className="h-6 w-6 text-white animate-spin" />{" "}
                <span>Processing...</span>{" "}
              </p>
            ) : (
              "Edit Product"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
