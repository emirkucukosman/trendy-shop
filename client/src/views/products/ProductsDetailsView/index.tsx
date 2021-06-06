import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { fetchProductBySlug, selectProductStatus, selectProduct } from "src/slices/productSlice";
import Container from "src/components/Container";
import LoadingScreen from "src/components/LoadingScreen";
import Rating from "./Rating";
import Price from "./Price";
import Specs from "./Specs";
import AddToCartButtons from "./AddToCartButtons";

const MemoizedRating = React.memo(Rating);
const MemoizedPrice = React.memo(Price);

const ProductsDetailsView = () => {
  const dispatch = useReduxDispatch();
  const productStatus = useReduxSelector(selectProductStatus);
  const product = useReduxSelector(selectProduct);
  const routerLocation = useLocation();

  useEffect(() => {
    dispatch(fetchProductBySlug(routerLocation.pathname.split("/")[2]));
  }, [dispatch, routerLocation.pathname]);

  if (productStatus === "loading") {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth="lg" className="mt-4 lg:mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center">
          <img src={product?.image} alt={product?.slug} className="h-96" />
        </div>
        <div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">{product?.title}</h1>
            <MemoizedRating product={product} />
            <div className="border border-gray-300 w-full mt-2"></div>
            <MemoizedPrice product={product} />
            <Specs />
            <div className="border border-gray-300 w-full mt-2"></div>
            <AddToCartButtons product={product} />
            <div className="border border-gray-300 w-full mt-8"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductsDetailsView;
