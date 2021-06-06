import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { selectCart, selectCartTotal } from "src/slices/productSlice";
import {
  createOrder,
  clearErrors,
  selectCreateOrderError,
  selectCreateOrderStatus,
} from "src/slices/orderSlice";
import { selectIsAuthenticated } from "src/slices/authSlice";
import Container from "src/components/Container";
import ItemCard from "./ItemCard";
import LoadingScreen from "src/components/LoadingScreen";
import NoItems from "./NoItems";

const CartView = () => {
  const dispatch = useReduxDispatch();
  const cart = useReduxSelector(selectCart);
  const cartTotal = useReduxSelector(selectCartTotal);
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const createOrderStatus = useReduxSelector(selectCreateOrderStatus);
  const createOrderError = useReduxSelector(selectCreateOrderError);

  const handlePlaceOrderClick = () => {
    if (!isAuthenticated)
      return toast("Please log in to place an order.", {
        type: "error",
        position: "bottom-center",
      });

    dispatch(createOrder(cart));
  };

  useEffect(() => {
    if (createOrderStatus === "error") {
      toast(createOrderError, { type: "error", position: "bottom-center" });
      dispatch(clearErrors());
    }
  }, [createOrderStatus, createOrderError, dispatch]);

  if (createOrderStatus === "loading") {
    return <LoadingScreen />;
  }

  if (createOrderStatus === "success") {
    return <Redirect to="/order-success" />;
  }

  if (cart.length === 0) {
    return <NoItems />;
  }

  return (
    <Container maxWidth="lg">
      <div className="flex flex-col">
        {cart.map((item, i) => (
          <ItemCard item={item} key={i} />
        ))}
        <div className="flex flex-col items-end mt-8">
          <span className="text-xl">
            Cart Total: <span className="font-bold">${Number(cartTotal).toFixed(2)}</span>
          </span>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none"
            onClick={handlePlaceOrderClick}
          >
            Place Order
          </button>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CartView;
