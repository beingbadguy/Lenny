import React, { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MasterContext } from "../context/Context";
import Rating from "../components/Rating";
import Slider from "../components/Slider";

const Categories = () => {
  const { products, fav, addToFavourites, user } = useContext(MasterContext);
  const { category_name } = useParams();
  // console.log(category_name);

  const filteredProducts = products?.filter((product) =>
    product.category.toLowerCase().includes(category_name.toLowerCase())
  );

  // console.log(filteredProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-4 min-h-[62vh] mx-6 select-none">
      <div className="flex items-center gap-1  text-[12px] sm:text-md md:text-xl">
        <Link to={"/"} className="text-green-600">
          <p>Home</p>
        </Link>
        <MdChevronRight />
        <Link to={"/subcategories"} className="text-green-600">
          <p>Categories</p>
        </Link>
        <MdChevronRight />
        <p className="font-medium">{category_name}</p>
      </div>

      <div className="bg-yellow-500 mx-auto min-h-[100px] md:h-[170px] mt-6 rounded grid grid-cols-2">
        <img src="../guitar.png" alt="" className="h-20 md:h-32" />
        <div>
          <h1 className="p-6 text-sm sm:text-md md:text-4xl font-bold">
            Best Deals on {category_name}
          </h1>
          <p className="hidden md:px-1 sm:block md:block lg:tracking-[6px]   mx-6">
            Grab the deal as soon as possible.
          </p>
        </div>
      </div>
      <div className="text-2xl font-bold mt-10 md:mt-20">
        Showing products for "{category_name}"
      </div>
      <div className=" mt-5 mb-10">
        {filteredProducts.length > 0 ? (
          <div className="   grid grid-cols-2  sm:grid-cols-3  md:grid-cols-4   lg:grid-cols-4 gap-4">
            {products &&
              filteredProducts?.map((product, index) => (
                <div key={index} className="flex flex-col z-1 items-start ">
                  <div className="bg-neutral-200 p-5  z-1 rounded relative w-full">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images}
                        className="h-28 w-28 sm:h-48  sm:w-48  z-1  md:h-72 md:w-72 object-contain hover:scale-90 transition-all duration-300 "
                      />
                    </Link>

                    <div
                      className="absolute top-3 right-3 bg-white h-8 w-8 flex justify-center items-center rounded-full cursor-pointer"
                      onClick={() => {
                        if (user) {
                          addToFavourites(product);
                        } else {
                          navigate("/user");
                        }
                      }}
                    >
                      <FaRegHeart
                        className={`${
                          fav &&
                          user &&
                          fav.some((item) => item.id === product.id)
                            ? "text-red-500 "
                            : "text-green-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between w-full">
                    <p className="font-bold text-[12px] md:text-xl w-[80px] md:w-[200px]">
                      <Link to={`product/${product.id}`}>{product.name}</Link>
                    </p>
                    <p className="font-bold text-green-600 text-[12px] md:text-xl">
                      ₹{product.price}
                    </p>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    {" "}
                    <p className="text-neutral-400 text-[12px] md:text-xl">
                      {product.location}
                    </p>
                    <Rating noOfStars={product.rating} />
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh] font-medium text-red-500">
            "No products found for this category."
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
