import React, { useContext, useEffect } from "react";
import { MasterContext } from "../context/Context";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import Slider from "../components/Slider";

const SubCategories = () => {
  const { products } = useContext(MasterContext);
  const categories = products.map((item) => {
    return item.category;
  });
  // console.log(categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-6 min-h-[65vh] mb-10 select-none">
      <div className="mt-2">
        <Slider />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold my-5">Discover Products</h1>
        <TiArrowSortedDown />
      </div>

      <div>
        {[...new Set(categories)].map((item, index) => (
          <div
            key={index}
            className="bg-green-400 mt-4 p-2 text-black font-medium rounded hover:bg-green-700 transition-all duration-300"
          >
            <Link to={`/categories/${item}`}>
              <p>{item}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
