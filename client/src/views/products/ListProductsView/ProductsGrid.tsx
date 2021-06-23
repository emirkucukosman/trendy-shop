import React from "react";
import { useReduxSelector } from "src/app/hook";
import { selectProducts, selectProductsStatus } from "src/slices/productSlice";
import ProductCard from "./ProductCard";
import GridProductsLoading from "src/components/GridProductsLoading";

const ProductsGrid = () => {
  const products = useReduxSelector(selectProducts);
  const productsStatus = useReduxSelector(selectProductsStatus);

  if (productsStatus === "loading") {
    return <GridProductsLoading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-4 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-8 mt-8">
      {products.length !== 0 ? (
        products.map((product, i) => <ProductCard product={product} key={i} />)
      ) : (
        <div className="text-red-500">No Products Found</div>
      )}
    </div>
  );
};

export default ProductsGrid;
