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
import { Link, useNavigate } from "react-router-dom";
import { FaKitchenSet } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { SiLibreofficewriter } from "react-icons/si";
import { MdOutlinePets } from "react-icons/md";
import { FaCarrot } from "react-icons/fa6";
import { GiWoodBeam } from "react-icons/gi";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import Faq from "./components/Faq";
import Testimonial from "./components/Testimonial";

const App = () => {
  const { fetchProducts, products, user, fav, setFav, addToFavourites } =
    useContext(MasterContext);
  const categories = products.map((item) => {
    return item.category;
  });
  const navigate = useNavigate();

  const productsNew = products.slice(0, 6);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-[75vh] select-none">
      <div className="flex items-center justify-center mt-1  flex-col sm:mt-0 sm:flex-col ">
        <img
          src="https://img.freepik.com/premium-photo/eyeglasses-isolated-white-background-handmade-eyewear-spectacles-with-shiny-stainless-frame_149453-281.jpg?w=1480"
          alt=""
          className="h-60 md:h-72"
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
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-between">
            <Link to={"product/tP2AMgOYIJtuasYc0v8i"}>
              <Button
                text="Buy Now"
                clr="text-white"
                bgclr="bg-green-700 w-[320px]  sm:w-[240px]"
              />
            </Link>

            <Link to={"/subcategories"}>
              <Button
                text="Explore All"
                clr="text-black"
                bgclr="border border-green-500 w-[320px] sm:w-[240px]"
              />
            </Link>
          </div>
          {/* <h1 className="font-bold text-7xl tracking-[10px] ">Amy.</h1> */}
        </div>
      </div>

      {/* section 2 */}
      <div className="mt-10 mx-6 md:mx-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">Featured Category</h1>
        </div>
        <div className="mt-10 gap-6 flex overflow-scroll  sm:grid sm:grid-cols-3 md:grid-cols-4 mb-5 sm:overflow-visible   mx-4 ">
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
      <div className="flex items-center justify-center mt-10 p-4">
        <Slider />
      </div>

      {/* products  */}
      <div className="mt-10   flex items-start justify-center flex-col">
        <h1 className="text-4xl font-bold text-center mx-10">
          Popular Products on Amy.
        </h1>
        <div className=" grid grid-cols-2  sm:grid-cols-3  md:grid-cols-4 mb-5  lg:grid-cols-5 gap-4 px-6 mt-4">
          {products &&
            productsNew.map((product, index) => (
              <div key={index} className="flex flex-col items-start ">
                <div className="bg-neutral-200 p-5 rounded relative w-full">
                  <Link to={`product/${product.id}`}>
                    <img
                      src={product.images}
                      className="h-36 sm:h-48  sm:w-48  md:h-64 md:w-64 lg:w-72 lg:h-72 object-contain hover:scale-90 transition-all duration-300 "
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

      {/* faq  */}
      <div className="flex items-center justify-center md:justify-around mt-6 flex-col mb-20 md:flex-row">
        <div className=" md:block ml-5 md:ml-0 ">
          <h1 className="text-3xl">Some Hot Burning Question?</h1>
        </div>
        <div className="ml-5 mr-5 my-5 flex flex-col gap-4">
          <Faq
            q={"Do you offer international shipping?"}
            a={
              " yes, we offer international shipping to many countries. Shipping costs and delivery times vary based on the destination. "
            }
          />
          <Faq
            q={"How do I change or cancel my order?"}
            a={
              " If you need to change or cancel your order, please contact our customer service team as soon as possible."
            }
          />
          <Faq
            q={"What is your return and exchange policy?"}
            a={
              "We offer a 30-day return policy for most items. To be eligible for a return or exchange, the item must be in its original condition and packaging. "
            }
          />{" "}
          <Faq
            q={"How can I track my order?"}
            a={
              " Once your order has been shipped, you will receive a confirmation email with a tracking number and a link to track your shipment."
            }
          />
        </div>
      </div>

      {/* testimonials  */}

      <div className="mx-10  mt-10 mb-20">
        <h1 className="text-3xl md:ml-0 my-3 mb-10">
          What people think about us?
        </h1>
        <div className="flex flex-wrap  justify-center items-center gap-5  ">
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>

      {/* banner
       */}
      <div className=" grid-cols-1 sm:grid-cols-2 bg-green-100 items-center justify-items-center mb-20 gap-4 px-10 py-4 hidden">
        <div className=" ">
          <img
            src="./watch.png"
            alt=""
            className=" h-24 w-24 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-72 lg:w-72"
          />
        </div>
        <div className="text-center">
          <h1 className=" text-xl sm:text-2xl">
            Upgrade Your Wardrobe With Our Collection
          </h1>
          <p className="mt-4">
            Discover amazing deals on fashion, electronics, home essentials, and
            more.
          </p>
          <div className="sm:grid sm:grid-cols-2 grid  gap-2 mt-3">
            <Button clr="text-white bg-green-500" />
            <Button clr="text-black bg-transparent border-black border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
