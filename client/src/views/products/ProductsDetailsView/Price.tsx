import React from "react";
import { IProduct } from "src/interfaces/product";

type PriceProps = {
  product: IProduct | null;
};

const Price: React.FC<PriceProps> = ({ product }) => {
  return (
    <div className="flex items-end mt-6 space-x-2">
      {product?.price && (
        <span className="text-gray-600 text-md font-medium line-through">
          ${Number(Math.floor(Math.random() * 100) + product.price).toFixed(2)}
        </span>
      )}
      <span className="text-red-500 font-bold text-xl">${Number(product?.price).toFixed(2)}</span>
    </div>
  );
};

export default Price;
