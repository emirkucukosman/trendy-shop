import React from "react";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";

type ToolbarProps = {
  productsCount: number;
  currentLayout: string;
  handleLayoutChange: (value: "grid" | "list") => void;
};

const Toolbar: React.FC<ToolbarProps> = ({
  productsCount,
  currentLayout,
  handleLayoutChange,
}) => {
  return (
    <div className="bg-gray-200 w-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold">{productsCount}</span> <span>Products found</span>
        </div>
        <div className="hidden md:flex md:items-center">
          <span>View</span>
          <div className="flex items-center space-x-2 ml-4">
            <BsGrid3X3Gap
              size={22}
              className={
                currentLayout === "grid"
                  ? "text-black cursor-pointer"
                  : "text-gray-500 hover:text-black cursor-pointer"
              }
              onClick={() => handleLayoutChange("grid")}
            />
            <BsListUl
              size={22}
              className={
                currentLayout === "list"
                  ? "text-black cursor-pointer"
                  : "text-gray-500 hover:text-black cursor-pointer"
              }
              onClick={() => handleLayoutChange("list")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
