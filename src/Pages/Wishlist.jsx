import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext } from "react";
import { MasterContext } from "../context/Context";
import { IoIosArrowRoundBack } from "react-icons/io";

const Wishlist = () => {
  const { fav, user, deleteFromFav } = useContext(MasterContext);
  // console.log(fav);
  return (
    <div className="min-h-[70vh] select-none ">
      <div className="bg-neutral-200 pt-5 px-6 min-h-[30vh]">
        <p className="flex items-center  text-[12px] sm:text-md md:text-lg   text-green-500 font-medium">
          <Link to="/">Home</Link> <MdChevronRight />
          <span className="text-black">wishlist</span>
        </p>
        <div className="mt-10">
          <p className="text-2xl font-bold">Wishlist</p>
          <p className="mt-2">Showing your Favourites</p>
        </div>
      </div>

      {fav.length === 0 && user ? (
        <div className="flex justify-center items-center pt-20 text-center mx-6 text-red-400 font-bold">
          <p>You do not have anything in your wishlist at this moment...</p>
        </div>
      ) : (
        ""
      )}
      <div>
        {user ? (
          <div
            className={`${
              fav.length === 0
                ? "hidden"
                : "shadow-md mx-auto w-[90%] sm:w-[80%] mt-[-5vh] bg-white rounded-lg border mb-20"
            } `}
          >
            {fav &&
              fav.map((item, index) => (
                <div
                  className=" grid grid-cols-2 gap-6 sm:flex sm:justify-between sm:items-center p-5 border border-b"
                  key={index}
                >
                  <div className="bg-neutral-300 p-4 rounded sm:w-auto sm:h-auto w-[72px] h-fi border  flex items-center justify-center cursor-pointer">
                    <img
                      src={item.images}
                      alt=""
                      className=" h-10 w-10 sm:h-16 sm:w-16 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-neutral-400">{item.location}</p>
                    <p className="text-green-500 font-bold">₹{item.price}</p>
                  </div>
                  <Link to={`/product/${item.id}`}>
                    <div className="flex items-center justify-center gap-1 border px-2 py-1 cursor-pointer rounded w-[70px] bg-green-600 text-white hover:bg-green-700 transition-all duration-400">
                      <IoIosArrowRoundBack className="rotate-180" />
                      <p>View</p>
                    </div>
                  </Link>

                  <div
                    onClick={() => {
                      deleteFromFav(item);
                    }}
                  >
                    <RiDeleteBin5Line className="text-4xl border p-2 rounded cursor-pointer hover:text-red-400 hover:border-red-500 transition-all duration-300" />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20 flex-col gap-4 mb-20 ">
            <p className="text-green-600 w-[300px] text-center">
              You Have to sign in or create an account to view your Favourite.
            </p>
            <Link to="/login">
              <div className="text-green-600 border border-green-500 p-2 font-bold hover:text-green-700 transition-all duration-300 rounded w-[200px] text-center">
                Log In
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
