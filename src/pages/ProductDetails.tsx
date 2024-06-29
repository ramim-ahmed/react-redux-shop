import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleProductQuery } from "../app/features/product/productApi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { Button, Spin } from "antd";
import Rating from "react-rating";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";

type RouteParams = {
  id: string;
};
function ProductDetails() {
  const { id } = useParams<RouteParams>();
  const { data, isLoading, isError } = useFetchSingleProductQuery(id);

  const {
    title,
    description,
    price,
    stock,
    tags,
    rating,
    category,
    thumbnail,
    images,
    dimensions,
    brand,
    sku,
    reviews,
  } = data || {};
  const navigate = useNavigate();
  const [viewImage, setViewImage] = useState("");
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Spin />
      </div>
    );
  }
  if (!isLoading && isError) {
    return (
      <div className="w-full flex justify-center pt-20 items-center">
        <h1 className="text-red-500 text-xl">Internal sever Error!!</h1>
      </div>
    );
  }
  const handleGoBack = () => {
    navigate(-1 || "/");
  };

  return (
    <div className="">
      <div
        onClick={handleGoBack}
        className="cursor-pointer pt-3 space-x-2 flex items-center"
      >
        <p>
          <MdKeyboardBackspace className="w-6 h-6" />
        </p>
        <p>Go Back</p>
      </div>
      <div className="bg-gray-50 p-5 border mt-4 grid grid-cols-12">
        <div className="lg:col-span-6 col-span-12">
          <div>
            <div className="flex justify-center">
              <img
                className="w-80 h-72 object-cover"
                src={viewImage || thumbnail}
                alt={title}
              />
            </div>
            <div className="flex items-center mt-4 space-x-5">
              {images?.map((item, index) => (
                <img
                  onClick={() => setViewImage(item)}
                  className="w-24 cursor-pointer border"
                  key={index}
                  src={item}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 lg:border-l lg:pl-5 mt-6 lg:mt-0">
          <div className="space-y-3">
            <p className="bg-indigo-600 text-white inline-block px-2 text-sm">
              {category}
            </p>
            <h1 className="text-xl font-medium">{title}</h1>
            <Rating
              initialRating={rating}
              readonly
              fullSymbol={<FaStar className="w-6 h-6 text-orange-400" />}
              emptySymbol={<FaRegStar className="w-6 h-6 text-orange-400" />}
            />
            <p>Price: $ {price}</p>
            <p>Brand: {brand || "Unknown"}</p>
            <p>Stock Available: {stock} pieces</p>
            <div>
              <p>Dimentions : </p>
              <ul className="mt-1 list-disc ml-10">
                <li className="text-sm">Width: {dimensions?.width}"</li>
                <li className="text-sm">Height: {dimensions?.height}"</li>
                <li className="text-sm">Depth: {dimensions?.depth}"</li>
              </ul>
            </div>
            <p>SKU : {sku}</p>
            <div className="flex items-center space-x-1">
              <p>Tags : </p>
              <div className="flex space-x-3 items-center">
                {tags?.map((tag, index) => (
                  <p
                    className="bg-indigo-600 text-white px-3 text-sm"
                    key={index}
                  >
                    #{tag}
                  </p>
                ))}
              </div>
            </div>
            <div className=" mt-2">
              <Button className="w-full bg-indigo-600" type="primary">
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-5 border mt-4">
        <div>
          <h1 className="font-semibold">Description</h1>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="border-b font-semibold pb-2">Reviews</h2>
        <div className="space-y-3 mt-4">
          {reviews?.map((review, index) => (
            <div key={index} className="border-b py-3">
              <div className="flex items-center space-x-2">
                <FaRegUserCircle className="w-6 h-6" />
                <h2 className="font-medium">{review.reviewerName}</h2>
              </div>
              <div className="mt-2">
                <Rating
                  initialRating={review.rating}
                  readonly
                  fullSymbol={<FaStar className="w-4 h-4 text-orange-400" />}
                  emptySymbol={
                    <FaRegStar className="w-4 h-4 text-orange-400" />
                  }
                />
              </div>
              <div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
