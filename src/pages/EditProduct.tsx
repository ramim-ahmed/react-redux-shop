import {
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Typography,
  Rate,
  Card,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
import { TProduct } from "../types";

const initialData: TProduct = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "RCH45Q1A",
  weight: 2,
  dimensions: {
    width: 23.17,
    height: 14.43,
    depth: 28.01,
  },
  warrantyInformation: "1 month warranty",
  shippingInformation: "Ships in 1 month",
  availabilityStatus: "Low Stock",
  reviews: [
    {
      rating: 2,
      comment: "Very unhappy with my purchase!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "John Doe",
      reviewerEmail: "john.doe@x.dummyjson.com",
    },
    {
      rating: 2,
      comment: "Not as described!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Nolan Gonzalez",
      reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Very satisfied!",
      date: "2024-05-23T08:56:21.618Z",
      reviewerName: "Scarlett Wright",
      reviewerEmail: "scarlett.wright@x.dummyjson.com",
    },
  ],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: 24,
  meta: {
    createdAt: "2024-05-23T08:56:21.618Z",
    updatedAt: "2024-05-23T08:56:21.618Z",
    barcode: "9164035109868",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
  },
  images: [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

export default function EditProduct() {
  const [form] = Form.useForm();

  const onFinish = (values: TProduct) => {
    console.log("Form values: ", values);
  };

  return (
    <Form
      form={form}
      initialValues={initialData}
      onFinish={onFinish}
      layout="vertical"
    >
      <Title level={2}>Update Product</Title>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Input />
      </Form.Item>
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
      <Form.Item name="tags" label="Tags">
        <Input />
      </Form.Item>
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
