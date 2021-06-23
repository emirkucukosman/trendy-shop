import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { fetchAllProducts, selectProducts } from "src/slices/productSlice";
import Container from "src/components/Container";
import Categories from "./Categories";
import Brands from "./Brands";
import Toolbar from "./Toolbar";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ListProductsView = () => {
  const dispatch = useReduxDispatch();
  const routerLocation = useLocation();
  const products = useReduxSelector(selectProducts);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const category =
      routerLocation.pathname === "/" ? "" : routerLocation.pathname.split("/")[1];
    const brands = qs.parse(window.location.search, { ignoreQueryPrefix: true })
      .brands as string[];
    dispatch(fetchAllProducts({ category, brands }));
  }, [dispatch, routerLocation.pathname]);

  return (
    <Container maxWidth="2xl" className="mt-4">
      <div className="flex lg:space-x-8">
        <div className="hidden lg:flex lg:flex-col lg:items-start">
          <Categories />
          <Brands />
        </div>
        <div className="flex flex-col w-full lg:w-4/5">
          <Toolbar
            productsCount={products.length}
            currentLayout={layout}
            handleLayoutChange={(value) => setLayout(value)}
          />
          {layout === "grid" ? <ProductsGrid /> : <ProductsList />}
        </div>
      </div>
    </Container>
  );
};

export default ListProductsView;
