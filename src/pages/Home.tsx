import { useFetchProductsQuery } from "../app/features/product/productApi";
import ProductTable from "../components/ProductTable";

export default function Home() {
  const { data, isLoading, isError } = useFetchProductsQuery();
  const allProducts = data?.products || [];
  // decide what to render
  let content;
  if (isLoading) {
    content = <h1>loading.....</h1>;
  }
  if (!isLoading && isError) {
    content = <h1>Internal sever Error!!</h1>;
  }
  if (!isLoading && !isError && allProducts.length <= 0) {
    content = <h1>Data Not Found!!!</h1>;
  }
  if (!isLoading && !isError && allProducts.length > 0) {
    return (
      <div className="max-w-5xl mx-auto pt-10 px-3 min-h-screen">
        <ProductTable products={allProducts} />
      </div>
    );
  } else {
    return (
      <div className="max-w-5xl pt-10 mx-auto px-3 min-h-screen">{content}</div>
    );
  }
}
