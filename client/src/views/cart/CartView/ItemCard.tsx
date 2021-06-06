import React from "react";
import { useReduxDispatch } from "src/app/hook";
import { Link } from "react-router-dom";
import { removeFromCart } from "src/slices/productSlice";
import { ICartItem } from "src/interfaces/product";
import { BsTrash } from "react-icons/bs";

type ItemCardProps = {
  item: ICartItem;
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const dispatch = useReduxDispatch();

  const handleRemoveItemClick = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="flex flex-col shadow-md p-2 lg:flex-row lg:items-center lg:justify-between mb-8">
      <div className="flex items-center">
        <div>
          <img
            src={item.product.image}
            alt={item.product.slug}
            className="w-24 h-24 lg:w-36 lg:h-36"
          />
        </div>
        <div className="flex flex-col items-start ml-4">
          <span className="font-medium text-sm lg:text-lg">{item.product.title}</span>
          <span>
            <span className="text-gray-500">Brand: </span>
            <Link to={`/?brands=${item.product.brand}`}>
              <span className="text-blue-500">{item.product.brand}</span>
            </Link>
          </span>
          <span>
            <span className="text-gray-500">Quantity:</span> {item.quantity}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end lg:justify-center">
        <span className="text-red-500 font-medium text-lg">
          ${Number(item.product.price * item.quantity).toFixed(2)}
        </span>
        <button
          className="ml-2 text-xs rounded-full p-2 transition duration-200 hover:bg-red-500 hover:text-white focus:outline-none"
          onClick={handleRemoveItemClick}
        >
          <BsTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
