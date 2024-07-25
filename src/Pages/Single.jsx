import { collection, doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { MdChevronRight } from "react-icons/md";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { CiShoppingCart } from "react-icons/ci";
import { MasterContext } from "../context/Context";
import { FaRegHeart } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";

const Single = () => {
  const { products, fav, addToFavourites, user, addToCart, cart, setCart } =
    useContext(MasterContext);

  // console.log(cart);

  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [loader, setLoader] = useState(false);

  // console.log(product);

  const fetchProduct = async () => {
    setLoader(true);
    const producctRef = doc(db, "products", id);
    const response = await getDoc(producctRef);
    setProduct(response.data());
    setLoader(false);
  };

  const filteredProducts = products.filter((item) => {
    return item?.id !== id;
  });
  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
    if (user) {
      // console.log(cart);
    }
    return () => {};
  }, [id, cart, setCart, addToCart]);

  return (
    <div className="min-h-[65vh] mx-6 select-none">
      <p className="flex items-center  text-[12px] sm:text-md md:text-lg  my-10 text-green-500 font-medium">
        <Link to="/">Home</Link> <MdChevronRight />
        <Link to="/subcategories" className="hidden sm:block">
          Categories
        </Link>{" "}
        <MdChevronRight className="hidden sm:block" />
        <Link to={`/categories/${product?.category}`}>{product?.category}</Link>
        <MdChevronRight /> <span className="text-black">{product?.name}</span>
      </p>
      {!loader ? (
        <div className="flex flex-col md:flex-row justify-start gap-4 md:gap-[2%] ">
          <div className="bg-neutral-200 p-6 md:w-[600px] md:h-[300px] flex justify-center items-center ">
            <img
              src={product?.images}
              alt=""
              className=" h-36 w-36 md:h-64 md:w-64"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-5  ">
            <p className="font-bold text-xl md:text-4xl">{product?.name}</p>
            <Rating noOfStars={product?.rating} />
            <p className="font-bold text-2xl text-green-400">
              ₹{product?.price}
            </p>
            <p className="text-neutral-500">{product?.location}</p>

            <p className="md:w-[90%]">{product?.description}</p>
            <hr className="hidden md:flex border border-neutral-100" />
            <div className="flex gap-5 font-medium mt-8 md:mt-10">
              <div
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                <Button
                  clr="text-white"
                  bgclr="bg-green-600 w-[140px] md:w-[200px]"
                  text="Buy now"
                />
              </div>

              <div
                className="flex items-center justify-center w-[200px] border border-green-600 rounded text-green-600 hover:scale-90 transition-all duration-500"
                onClick={() => {
                  if (!user) {
                    return navigate("/login");
                  } else {
                    if (
                      cart &&
                      cart.some((item) => item?.name === product?.name)
                    ) {
                      addToCart(product);
                      navigate(`/cart`);
                    } else {
                      addToCart(product);
                    }
                  }
                }}
              >
                <CiShoppingCart className="text-2xl" />
                <Button
                  clr="text-green-600"
                  bgclr="bg-white"
                  text={
                    cart && cart.some((item) => item?.name === product?.name)
                      ? "Added to cart"
                      : "Add to cart"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <InfinitySpin
            visible={true}
            width="100"
            height="100"
            color="green"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )}

      <hr className="mt-10" />
      <div className="pt-10">
        <h1 className="text-3xl">Related Products</h1>
      </div>
      <div className=" mt-5 grid md:grid-cols-4 gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-10">
        {products &&
          filteredProducts.map((product, index) => (
            <div key={index} className="flex flex-col items-start   ">
              <div className="bg-neutral-200 p-5 rounded relative w-full  ">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images}
                    className=" h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64 object-contain   hover:scale-90 transition-all duration-300 "
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
                      fav && user && fav.some((item) => item.id === product.id)
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
  );
};

export default Single;
