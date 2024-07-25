import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import { MasterContext } from "../context/Context";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Button from "../components/Button";

const Cart = () => {
  const { cart, user, cartRemove, setCart, products } =
    useContext(MasterContext);
  const [total, setTotal] = useState([]);

  const increment = async (item) => {
    const collectionRef = doc(db, "users", user.userId);
    const data = await getDoc(collectionRef);
    if (data.exists()) {
      const actualUser = data.data();
      const thatCart = actualUser.carts || [];
      const thatItemIndex = thatCart.findIndex(
        (product) =>
          product.name === item.name && product.description === item.description
      );
      const thatItem = products.find(
        (product) =>
          product.name === item.name && product.description === item.description
      );
      const updatedItem = [...thatCart];
      // console.log(thatItem.price, thatCart[thatItemIndex].quantity);

      updatedItem[thatItemIndex] = {
        ...updatedItem[thatItemIndex],
        quantity: updatedItem[thatItemIndex].quantity + 1,
        itemtotalPrice: thatItem.price * (thatCart[thatItemIndex].quantity + 1),
      };
      await updateDoc(collectionRef, {
        carts: updatedItem,
      });
      setCart(updatedItem);
    }
  };

  const decrement = async (item) => {
    const collectionRef = doc(db, "users", user.userId);
    const data = await getDoc(collectionRef);
    if (data.exists()) {
      const actualUser = data.data();
      const thatCart = actualUser.carts || [];
      const thatItemIndex = thatCart.findIndex(
        (product) =>
          product.name === item.name && product.description === item.description
      );
      const thatItem = products.find(
        (product) =>
          product.name === item.name && product.description === item.description
      );
      const updatedItem = [...thatCart];

      updatedItem[thatItemIndex] = {
        ...updatedItem[thatItemIndex],
        quantity: updatedItem[thatItemIndex].quantity - 1,
        itemtotalPrice: thatItem.price * (thatCart[thatItemIndex].quantity - 1),
      };
      await updateDoc(collectionRef, {
        carts: updatedItem,
      });
      setCart(updatedItem);
    }
  };

  useEffect(() => {
    if (cart) {
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.itemtotalPrice,
        0
      );

      setTotal(totalPrice);
    }
  }, [setCart, cart]);

  return (
    <div className="min-h-[70vh] select-none ">
      <div className="bg-neutral-200 pt-5 px-6 min-h-[30vh]">
        <p className="flex items-center  text-[12px] sm:text-md md:text-lg   text-green-500 font-medium">
          <Link to="/">Home</Link> <MdChevronRight />
          <span className="text-black">cart</span>
        </p>
        <div className="mt-10">
          <p className="text-2xl font-bold">Cart</p>
          <p className="mt-2">Showing your Choice</p>
        </div>
      </div>

      {cart.length === 0 && user ? (
        <div className="flex justify-center items-center pt-20 text-center mx-6 text-red-400 font-bold">
          <p>You do not have anything in your cart at this moment...</p>
        </div>
      ) : (
        ""
      )}

      <div className="">
        {user ? (
          <div className="flex gap-5 flex-col sm:flex-row mx-4 items-start">
            <div
              className={`${
                cart.length === 0
                  ? "hidden"
                  : "shadow-md mx-auto w-[90%] sm-[100%] md:w-[100%] mt-[-5vh] bg-white rounded-lg border mb-20"
              } `}
            >
              {cart &&
                cart.map((item, index) => (
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
                    {/* <p>{item.itemtotalPrice}</p> */}
                    <div className="flex items-center border  min-w-36 w-[170px] ">
                      <div
                        className=" p-[14px] max-w-20 cursor-pointer "
                        onClick={() => {
                          if (item.quantity > 1) {
                            decrement(item);
                          }
                        }}
                      >
                        <FiMinus />
                      </div>
                      <input
                        type="text"
                        value={item.quantity}
                        disabled
                        className="p-2 max-w-20 w-20   outline-none text-center"
                      />
                      <div
                        className=" p-[14px] max-w-20 cursor-pointer  "
                        onClick={() => {
                          increment(item);
                        }}
                      >
                        <GoPlus />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        cartRemove(item);
                      }}
                      className=" w-12 flex items-center justify-center ml-10 sm:ml-0"
                    >
                      <RiDeleteBin5Line className="text-4xl border  p-2 rounded cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-300" />
                    </div>
                  </div>
                ))}
            </div>
            <div
              className={`${
                cart.length === 0
                  ? "hidden"
                  : "shadow-md mx-auto w-[90%] sm:w-[80%] md:w-[50%] p-4  mt-[-5vh] bg-white rounded-md border mb-20 flex flex-col gap-4 "
              } `}
            >
              <p className="font-bold">Product Summary</p>
              <hr />
              <div className="text-neutral-500 grid gap-2">
                <p className="flex items-center justify-between">
                  Total Price : <span>₹{total}</span>
                </p>
                <p className="flex items-center justify-between">
                  Tax & Fee Price : <span>₹0</span>
                </p>
              </div>
              <hr />
              <div className="font-bold">
                <p className="flex items-center justify-between">
                  Grand Price : <span>₹{total}</span>
                </p>
              </div>
              <Link to={"/checkout"}>
                <Button clr="bg-green-600 text-white" text="Checkout" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20 flex-col gap-4 mb-20 ">
            <p className="text-green-600 w-[300px] text-center">
              You Have to sign in or create an account to view your cart.
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

export default Cart;
