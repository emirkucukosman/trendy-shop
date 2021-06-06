import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "src/interfaces/product";
import { BsFillStarFill, BsStar } from "react-icons/bs";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-start">
      <Link to={`/product/${product.title.toLowerCase().replaceAll(" ", "-")}`} className="w-full">
        <div className="flex justify-center w-full">
          <img
            src={product.image}
            alt="iphone"
            className="h-64 cursor-pointer transform transition duration-200 hover:scale-105"
          />
        </div>
      </Link>
      <p>{product.brand}</p>
      <hr className="border border-gray-300 w-full mt-2" />
      <Link to={`/product/${product.title.toLowerCase().replaceAll(" ", "-")}`}>
        <p className="text-blue-500 cursor-pointer mt-2 truncate w-full">{product.title}</p>
      </Link>
      <div className="flex items-center space-x-1 mt-2">
        {Array.from(Array(product.rating), (_, i) => (
          <BsFillStarFill className="text-yellow-500" key={i} />
        ))}
        {Array.from(Array(5 - product.rating), (_, i) => (
          <BsStar key={i} />
        ))}
      </div>
      <span className="font-bold text-lg mt-1">${Number(product.price).toFixed(2)}</span>
    </div>
  );
};

export default ProductCard;
