import React from "react";

const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-4 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-8 mt-8">
      {Array.from(Array(8), (_, i) => (
        <div className="flex flex-col items-start animate-pulse" key={i}>
          <div className="flex justify-start w-full">
            <div className="w-64 h-64 bg-gray-200 rounded-md" />
          </div>
          <div className="h-3 w-24 bg-gray-200 rounded-md mt-2" />
          <hr className="border border-gray-300 w-full mt-2" />
          <div className="h-3 w-12 bg-blue-500 rounded-md mt-2" />
          <div className="flex items-center space-x-1 mt-2">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-3 rounded-full bg-gray-200" />
          </div>
          <span className="font-bold text-lg mt-1"></span>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;
