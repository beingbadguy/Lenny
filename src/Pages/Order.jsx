import React, { useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { MasterContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa6";

const Order = () => {
  const { orderid, user } = useContext(MasterContext);
  // console.log(orderid);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col gap-4">
      <div className="bg-green-300 h-20 w-20 flex items-center justify-center rounded-full">
        <FaCheck className="text-5xl text-green-600" />
      </div>
      <div>
        <p className="font-bold text-sm md:text-2xl text-center">
          Your Order Has Been Created Succefully
        </p>
      </div>
      <div className="w-[70%] text-center ">
        Order Id : <span className="text-neutral-400">{orderid}</span>
      </div>
      <div className="w-[70%] text-center ">
        <p className="">
          Thankyou for Shopping, You must have received an email regarding this
          order, We are on the way to fullfill your order.
        </p>
      </div>
      <div className="flex gap-5">
        <Link to={"/"}>
          <button className="bg-green-700 text-white p-2 rounded hover:bg-green-500 transition-all duration-300 hover:scale-95">
            Back to home
          </button>
        </Link>
        <Link to={"/user"}>
          <button className="bg-black text-white p-2 rounded  hover:bg-neutral-700 transition-all duration-300 hover:scale-95">
            Check my orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Order;
