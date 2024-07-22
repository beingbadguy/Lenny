import React, { useContext } from "react";
import { MasterContext } from "./context/Context";
// const { products } = useContext(MasterContext);

import { useEffect } from "react";
import Button from "./components/Button";
import Slider from "./components/Slider";
import CategoryBox from "./components/CategoryBox";
import { FaBookOpen } from "react-icons/fa6";
import { FaGamepad } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { IoShirt } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Rating from "./components/Rating";
import { Link } from "react-router-dom";
import { FaKitchenSet } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import { MdOutlinePets } from "react-icons/md";
import { FaCarrot } from "react-icons/fa6";
import { GiWoodBeam } from "react-icons/gi";

const App = () => {
  const { products } = useContext(MasterContext);
  const categories = products.map((item) => {
    return item.category;
  });
  useEffect(() => {}, [products]);
  return (
    <div className="min-h-[75vh] select-none">
      <div className="flex items-center justify-center  flex-col  ">
        <img
          src="https://img.freepik.com/premium-photo/eyeglasses-isolated-white-background-handmade-eyewear-spectacles-with-shiny-stainless-frame_149453-281.jpg?w=1480"
          alt=""
          className="h-72"
        />
        <div className="p-4 flex flex-col gap-4 w-full justify-center items-center  ">
          <h1 className="text-2xl md:text-5xl font-bold text-black text-center">
            Upgrade Your Wardrobe <br />
            With Our Collection
          </h1>
          <p className="text-black md:w-[600px] text-center">
            Discover amazing deals on fashion, electronics, home essentials, and
            more. Shop now for quality products at unbeatable prices. Fast
            shipping and secure checkout guaranteed!
          </p>
          <div className="flex items-center gap-5 justify-between">
            <Link to={"product/tP2AMgOYIJtuasYc0v8i"}>
              <Button
                text="Buy Now"
                clr="text-white"
                bgclr="bg-green-700 w-[120px]"
              />
            </Link>

            <Link to={"/subcategories"}>
              <Button
                text="Explore More"
                clr="text-black"
                bgclr="border border-green-500"
              />
            </Link>
          </div>
          {/* <h1 className="font-bold text-7xl tracking-[10px] ">Lenny.</h1> */}
        </div>
      </div>

      {/* section 2 */}
      <div className="mt-10 mx-6 md:mx-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">Featured Category</h1>
        </div>
        <div className="mt-10 gap-10 flex overflow-scroll md:flex-wrap mb-5 sm:overflow-auto flex-row  md:gap-10 ">
          <Link to={`/categories/electronics`}>
            <CategoryBox
              type="Electronics"
              no="26 items"
              icon={<FaHeadphones className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/mobiles`}>
            <CategoryBox
              type="Mobiles"
              no="26 items"
              icon={<FaMobileAlt className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/fashion`}>
            <CategoryBox
              type="Fashion"
              no="32 items"
              icon={<IoShirt className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/books`}>
            <CategoryBox
              type="Books"
              no="30 items"
              icon={<FaBookOpen className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/toys-games`}>
            <CategoryBox
              type="Toys & games"
              no="36 items"
              icon={<FaGamepad className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/home-kitchen`}>
            <CategoryBox
              type="Home & Kitchen"
              no="45 items"
              icon={<FaKitchenSet className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/beauty-health`}>
            <CategoryBox
              type="Beauty & Health"
              no="45 items"
              icon={<GiMedicines className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/sports-outdoors`}>
            <CategoryBox
              type="Sports & Outdoor"
              no="45 items"
              icon={<IoIosFootball className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/Office-Supplies`}>
            <CategoryBox
              type="Office Supplies"
              no="45 items"
              icon={<SiLibreofficewriter className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/pet-supplies`}>
            <CategoryBox
              type="Pet Supplies"
              no="45 items"
              icon={<MdOutlinePets className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/groceries`}>
            <CategoryBox
              type="Groceries"
              no="45 items"
              icon={<FaCarrot className="text-2xl text-green-700" />}
            />
          </Link>
          <Link to={`/categories/furniture`}>
            <CategoryBox
              type="furniture"
              no="45 items"
              icon={<GiWoodBeam className="text-2xl text-green-700" />}
            />
          </Link>
        </div>
      </div>
      {/* Slider  */}
      <div className="flex items-center justify-center p-4">
        <Slider />
      </div>

      {/* products  */}
      <div className="mt-10 mb-10  flex items-start justify-center flex-col">
        <h1 className="text-4xl font-bold text-center mx-10">
          Popular Products on Lenny.
        </h1>
        <div className="mt-10 flex gap-6 sm:gap-7 md:gap-14 mx-4 md:mx-10 flex-wrap">
          {products &&
            products.map((product, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="bg-neutral-200 p-5 rounded relative">
                  <Link to={`product/${product.id}`}>
                    <img
                      src={product.images}
                      className="h-28 w-28 sm:h-44  sm:w-44  md:h-64 md:w-64 hover:scale-90 transition-all duration-300 "
                    />
                  </Link>

                  <div className="absolute top-3 right-3 bg-white h-8 w-8 flex justify-center items-center rounded-full cursor-pointer">
                    <FaRegHeart />
                  </div>
                </div>
                <div className="flex items-start justify-between w-full">
                  <p className="font-bold text-[12px] md:text-xl w-[80px] md:w-[200px]">
                    {product.name}
                  </p>
                  <p className="font-bold text-green-600 text-[12px] md:text-xl">
                    ₹{product.price}
                  </p>
                </div>
                <p className="text-neutral-400 text-[12px] md:text-xl">
                  {product.location}
                </p>
                <Rating noOfStars={product.rating} />
              </div>
            ))}
        </div>
      </div>

      {/* banner
       */}
      <div className="mb-20 my-20 px-20 hidden md:flex md:items-center md:justify-end bg-green-100 ">
        <div className="p-4  absolute  flex justify-center items-center rounded">
          <img src="./watch.png" alt="" className="h-72 w-72" />
        </div>
        <div className="mx-20 p-4 flex flex-col gap-4 w-full items-center md:justify-start md:items-start  ">
          <h1 className="text-2xl md:text-4xl font-bold text-black text-center">
            Upgrade Your Wardrobe With Our Collection
          </h1>
          <p className="text-black md:w-[600px] text-center">
            Discover amazing deals on fashion, electronics, home essentials, and
            more. Shop now for quality products at unbeatable prices. Fast
            shipping and secure checkout guaranteed!
          </p>
          <div className="flex items-center gap-5 justify-between">
            <Button text="Buy Now" clr="text-white" bgclr="bg-green-700" />
            <Button
              text="View Details"
              clr="text-black"
              bgclr="border border-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
