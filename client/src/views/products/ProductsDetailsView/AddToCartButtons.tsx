import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useReduxDispatch } from "src/app/hook";
import { addToCart } from "src/slices/productSlice";
import { IProduct } from "src/interfaces/product";
import { BsDash, BsPlus } from "react-icons/bs";

type AddToCartButtonsProps = {
  product: IProduct | null;
};

const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useReduxDispatch();
  const history = useHistory();

  const handleQuantityClick = (increment: 1 | -1) => {
    if (quantity === 1 && increment === -1) return;
    setQuantity(quantity + increment);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ uid: Math.random(), product, quantity }));
      toast("Product added to cart.", { type: "success", position: "bottom-center" });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart({ uid: Math.random(), product, quantity }));
      history.push("/cart");
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-end mt-6">
        <div className="flex flex-col items-start">
          <span className="text-gray-600 text-sm">Quantity</span>
          <div className="flex items-center border border-black px-2 py-1 mt-1">
            <BsDash size={18} className="cursor-pointer" onClick={() => handleQuantityClick(-1)} />
            <div className="mx-8 select-none">{quantity}</div>
            <BsPlus size={18} className="cursor-pointer" onClick={() => handleQuantityClick(1)} />
          </div>
        </div>
        <button
          className="ml-6 bg-gray-800 text-white px-5 py-2 rounded-md transition duration-200 hover:bg-gray-900 focus:outline-none"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-6 w-full">
        <button
          className="w-full bg-yellow-400 px-5 py-3 rounded-md transition duration-200 hover:bg-yellow-500 focus:outline-none"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToCartButtons;
