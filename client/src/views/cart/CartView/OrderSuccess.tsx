import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReduxDispatch } from "src/app/hook";
import { clearCart } from "src/slices/productSlice";
import { clearStatus } from "src/slices/orderSlice";
import Container from "src/components/Container";
import { BsCheckCircle } from "react-icons/bs";

const OrderSuccess = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearStatus());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="mt-12 md:mt-24 px-4">
      <div>
        <div className="flex items-center justify-center bg-green-300 text-white text-sm md:text-lg p-5 rounded-md space-x-4">
          <BsCheckCircle size={22} />
          <span>Your order has been placed successfuly</span>
        </div>
      </div>
      <Link to="/">
        <div className="mt-12 flex justify-center text-blue-500 hover:underline">
          Go Back to Shopping
        </div>
      </Link>
    </Container>
  );
};

export default OrderSuccess;
