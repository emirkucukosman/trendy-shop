import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "src/interfaces/product";
import { BsFillStarFill, BsStar } from "react-icons/bs";

type RatingProps = {
  product: IProduct | null;
};

const Rating: React.FC<RatingProps> = ({ product }) => {
  return (
    <div className="flex items-center mt-4">
      <span>
        Brand:{" "}
        <Link to={`/?brands=${product?.brand}`}>
          <span className="text-blue-500 hover:underline">{product?.brand}</span>
        </Link>
      </span>
      <span className="mx-6">|</span>
      <span className="flex items-center space-x-1">
        {Array.from(Array(product?.rating), (_, i) => (
          <BsFillStarFill className="text-yellow-500" key={i} />
        ))}
        {Array.from(Array(5 - (product?.rating || 5)), (_, i) => (
          <BsStar key={i} />
        ))}
      </span>
      <span className="ml-2 text-gray-500">{Math.floor(Math.random() * 100)} reviews</span>
    </div>
  );
};

export default Rating;
