import React from "react";

const ListProductsLoading = () => {
  return (
    <>
      {Array.from(Array(8), (_, i) => (
        <div className="flex items-center justify-between mt-8 animate-pulse" key={i}>
          <div className="flex items-center">
            <div>
              <div className="w-44 h-44 bg-gray-200 rounded-md" />
            </div>
            <div className="flex flex-col ml-8">
              <div className="h-3 w-12 bg-blue-500 rounded-md mt-2" />
              <span className="text-gray-400">
                <div className="h-3 w-24 bg-gray-200 rounded-md mt-2" />
              </span>
              <div className="flex items-center space-x-1 mt-2">
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <div className="h-3 w-3 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListProductsLoading;
