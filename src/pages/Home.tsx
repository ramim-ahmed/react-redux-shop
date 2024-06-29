import { Spin } from "antd";
import { useFetchProductsQuery } from "../app/features/product/productApi";
import ProductTable from "../components/ProductTable";

export default function Home() {
  const { data, isLoading, isError } = useFetchProductsQuery();
  const allProducts = data?.products || [];
  // decide what to render
  let content;
  if (isLoading) {
    content = <Spin />;
  }
  if (!isLoading && isError) {
    content = <h1>Internal sever Error!!</h1>;
  }
  if (!isLoading && !isError && allProducts.length <= 0) {
    content = <h1>Data Not Found!!!</h1>;
  }
  if (!isLoading && !isError && allProducts.length > 0) {
    return (
      <div className="">
        <div className="mt-4">
          <ProductTable products={allProducts} />
        </div>
      </div>
    );
  } else {
    return <div className="flex justify-center pt-20">{content}</div>;
  }
}
