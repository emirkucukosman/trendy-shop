import React from "react";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { fetchAllProducts, selectCategoryFilter } from "src/slices/productSlice";
import { useHistory } from "react-router-dom";

const brands = [
  {
    title: "Apple",
    slug: "apple",
  },
  {
    title: "Beats",
    slug: "beats",
  },
  {
    title: "Chanel",
    slug: "chanel",
  },
  {
    title: "Gucci",
    slug: "gucci",
  },
  {
    title: "Herschel",
    slug: "herschel",
  },
  {
    title: "Louis Vuitton",
    slug: "louis-vuitton",
  },
  {
    title: "Microsoft",
    slug: "microsoft",
  },
  {
    title: "Nike",
    slug: "nike",
  },
  {
    title: "Under Armour",
    slug: "under-armour",
  },
];

type BrandsProps = {
  className?: string;
};

const filteredBrands: any[] = [];

const Brands: React.FC<BrandsProps> = ({ className }) => {
  const history = useHistory();
  const dispatch = useReduxDispatch();
  const categoryFilter = useReduxSelector(selectCategoryFilter);

  const handleBrandToggle = (event: any) => {
    if (event.target.checked) {
      filteredBrands.push(event.target.name);
    } else {
      const index = filteredBrands.indexOf(event.target.name);
      if (index > -1) {
        filteredBrands.splice(index, 1);
      }
    }

    if (filteredBrands.length === 0) {
      categoryFilter ? history.push(`/${categoryFilter}`) : history.push(`/`);
      dispatch(fetchAllProducts({ category: categoryFilter }));
    } else {
      history.push(`?brands=${filteredBrands.join(",")}`);
      dispatch(fetchAllProducts({ category: categoryFilter, brands: filteredBrands }));
    }
  };

  return (
    <div className={`hidden shadow-md rounded-md w-full p-6 mt-8 lg:block ${className}`}>
      <h1 className="text-2xl">Brands</h1>
      <div className="flex flex-col items-start mt-8">
        {brands.map((brand, i) => (
          <div className="flex items-center space-x-2 text-gray-500 mb-3" key={i}>
            <input type="checkbox" name={brand.title} onChange={handleBrandToggle} />
            <span>{brand.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
