import React from "react";
import { useHistory } from "react-router-dom";
import { useReduxDispatch } from "src/app/hook";
import { fetchAllProducts } from "src/slices/productSlice";

const categories = [
  {
    title: "All Products",
    slug: "",
  },
  {
    title: "Clothing & Apparel",
    slug: "clothing-apparel",
  },
  {
    title: "Garden & Kitchen",
    slug: "garden-kitchen",
  },
  {
    title: "Health & Beauity",
    slug: "health-beauity",
  },
  {
    title: "Computers & Technology",
    slug: "computers-technology",
  },
  {
    title: "Jewelry & Watches",
    slug: "jewelry-watches",
  },
  {
    title: "Phones & Accessories",
    slug: "phones-accessories",
  },
  {
    title: "Sport & Outdoors",
    slug: "sport-outdoors",
  },
  {
    title: "Books & Office",
    slug: "books-office",
  },
];

type CategoriesProps = {
  className?: string;
};

const Categories: React.FC<CategoriesProps> = ({ className }) => {
  const dispatch = useReduxDispatch();
  const history = useHistory();

  const handleCategoryClick = (category?: string) => {
    history.push(`/${category}`);
    dispatch(fetchAllProducts({ category }));
  };

  return (
    <div className={`hidden bg-gray-200 p-6 lg:block ${className}`}>
      <h1 className="text-2xl">Categories</h1>
      <div className="flex flex-col items-start mt-8 space-y-3">
        {categories.map((category, i) => (
          <div
            className="text-gray-500 cursor-pointer hover:text-gray-600"
            key={i}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
