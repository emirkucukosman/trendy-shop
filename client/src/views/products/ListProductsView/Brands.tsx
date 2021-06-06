import React, { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { fetchAllProducts, selectCategoryFilter } from "src/slices/productSlice";
import { useHistory } from "react-router-dom";
import { BiFilter } from "react-icons/bi";

const brands = [
  {
    title: "Apple",
    slug: "apple",
  },
  {
    title: "Microsoft",
    slug: "microsoft",
  },
  {
    title: "Beats",
    slug: "Beats",
  },
  {
    title: "Louis Vuitton",
    slug: "louis-vuitton",
  },
];

type BrandsProps = {
  className?: string;
};

const Brands: React.FC<BrandsProps> = ({ className }) => {
  const [toggledBrands, setToggledBrands] = useState(Array(brands.length).fill(false));
  const history = useHistory();
  const dispatch = useReduxDispatch();
  const categoryFilter = useReduxSelector(selectCategoryFilter);

  const handleApplyFilterClick = () => {
    const filteredBrands = [];
    for (let i = 0; i < toggledBrands.length; i++) {
      if (toggledBrands[i]) filteredBrands.push(brands[i].title);
    }
    if (filteredBrands.length !== 0) {
      history.push(`?brands=${filteredBrands.join(",")}`);
      return dispatch(fetchAllProducts({ category: categoryFilter, brands: filteredBrands }));
    }
    history.push(`/`);
    dispatch(fetchAllProducts({ category: categoryFilter }));
  };

  const handleBrandToggle = (index: number) => {
    const brandCopies = [...toggledBrands];
    brandCopies[index] = !brandCopies[index];
    setToggledBrands(brandCopies);
  };

  return (
    <div className={`hidden bg-gray-200 w-full p-6 lg:block ${className}`}>
      <h1 className="text-2xl">Brands</h1>
      <div className="flex flex-col items-start mt-8">
        {brands.map((brand, i) => (
          <div className="flex items-center space-x-2 text-gray-500 mb-3" key={i}>
            <input
              type="checkbox"
              checked={toggledBrands[i]}
              onChange={() => handleBrandToggle(i)}
            />
            <span>{brand.title}</span>
          </div>
        ))}
        <div className="mt-3">
          <button
            className="flex items-center space-x-2 bg-gray-800 rounded-md px-4 py-2 text-white border-none transition duration-200 hover:bg-gray-900 focus:outline-none"
            onClick={handleApplyFilterClick}
          >
            <BiFilter size={24} />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands;
