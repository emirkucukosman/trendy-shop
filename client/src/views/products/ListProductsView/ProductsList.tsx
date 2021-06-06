import React from "react";
import { useReduxSelector } from "src/app/hook";
import LoadingScreen from "src/components/LoadingScreen";
import { selectProducts, selectProductsStatus } from "src/slices/productSlice";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const products = useReduxSelector(selectProducts);
  const productsStatus = useReduxSelector(selectProductsStatus);

  if (productsStatus === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      {products.map((product, i) => (
        <div className="flex items-center justify-between mt-8" key={i}>
          <div className="flex items-center">
            <div>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.slug} className="w-44 h-44" />
              </Link>
            </div>
            <div className="flex flex-col ml-8">
              <Link to={`/product/${product.slug}`}>
                <span className="text-lg text-blue-500">{product.title}</span>
              </Link>
              <span className="text-gray-400">
                Brand: <span className="text-black">{product.brand}</span>
              </span>
              <div className="flex items-center space-x-1 mt-2">
                {Array.from(Array(product.rating), (_, i) => (
                  <BsFillStarFill className="text-yellow-500" key={i} />
                ))}
                {Array.from(Array(5 - product.rating), (_, i) => (
                  <BsStar key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-lg font-medium">${Number(product.price).toFixed(2)}</div>
        </div>
      ))}
    </>
  );
};

export default ProductsList;
