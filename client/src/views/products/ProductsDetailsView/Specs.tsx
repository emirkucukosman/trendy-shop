import React from "react";

const Specs = () => {
  return (
    <div className="flex flex-col mt-6">
      <span className="text-md">
        Sold By: <span className="text-blue-700 font-bold">Trendy</span>
      </span>
      <ul className="list-inside list-disc mt-2 text-lg text-gray-600">
        <li>Specification 1</li>
        <li>Specification 2</li>
        <li>Specification 3</li>
        <li>Specification 4</li>
        <li>Specification 5</li>
      </ul>
    </div>
  );
};

export default Specs;
