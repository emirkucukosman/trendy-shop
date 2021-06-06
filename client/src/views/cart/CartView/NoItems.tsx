import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "src/components/Container";
import { BsBag } from "react-icons/bs";

const NoItems = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <div className="flex items-center justify-center bg-red-500 text-white text-sm md:text-lg p-5 rounded-md space-x-4">
          <BsBag size={22} />
          <span>No items in the cart</span>
        </div>
      </div>
      <Link to="/">
        <div className="mt-12 flex justify-center text-blue-500 hover:underline">
          Go Back to Shopping
        </div>
      </Link>
      <ToastContainer />
    </Container>
  );
};

export default NoItems;
