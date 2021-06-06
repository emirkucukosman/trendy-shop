import React from "react";
import { IOrderItem } from "src/interfaces/order";
import { Link } from "react-router-dom";

type OrderItemProps = {
  orderItem: IOrderItem;
};

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div>
          <img src={orderItem.image} alt={orderItem.slug} className="w-16 h-16" />
        </div>
        <div className="flex flex-col ml-4">
          <span className="text-sm md:text-lg">{orderItem.title}</span>
          <span className="text-gray-400 text-sm md:text-lg">
            Brand:{" "}
            <Link to={`/?brands=${orderItem.brand}`}>
              <span className="text-blue-500 hover:underline">{orderItem.brand}</span>
            </Link>
          </span>
          <span className="text-gray-400 text-sm md:text-lg">
            Quantity: <span className="text-black">{orderItem.quantity}</span>
          </span>
        </div>
      </div>
      <div className="text-red-500 text-sm md:text-lg font-medium">
        ${Number(orderItem.price).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
