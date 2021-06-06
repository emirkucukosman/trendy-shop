import React from "react";
import { IOrder } from "src/interfaces/order";
import OrderItem from "./OrderItem";
import dayjs from "dayjs";

type OrderProps = {
  order: IOrder;
};

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className="shadow-md rounded-md p-4 mb-6">
      <div className="flex flex-col">
        <span className="text-lg font-medium">
          Order dated {dayjs(order.createdAt).format("DD/MM/YYYY - HH:mm")}
        </span>
        <div className="flex flex-col mt-4">
          {order.orderItems.map((orderItem, i) => (
            <OrderItem orderItem={orderItem} key={i} />
          ))}
        </div>
        <div className="flex items-center space-x-1 justify-end text-md md:text-xl ">
          <span>Total: </span>
          <span className="font-medium">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Order;
