import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";

const LayoutDashboard = () => {
  return (
    <div className="min-h-[100vh] flex gap-2 sm:gap-20 select-none">
      <div className="bg-black text-white w-[70px] fixed h-full md:w-[250px] gap-10 p-6 flex flex-col ">
        <div className="flex justify-start items-center  ">
          <CgShoppingBag className="text-green-700 text-3xl" />
          <Link to="/">
            <h2 className="font-bold ml-[-10px] md:ml-0 text-[14px] md:text-2xl">
              Lenny.
            </h2>
          </Link>
        </div>
        <Link to="" className="flex items-center gap-2">
          <MdOutlineDashboard className="text-2xl" />
          <p className="hidden md:block">Dashboard</p>
        </Link>
        <Link to="/dashboard" className="flex items-center gap-2">
          <IoIosAdd className="text-2xl" />
          <p className="hidden md:block">Add Products</p>
        </Link>
        <Link to="/dashboard/allproducts" className="flex items-center gap-2">
          <CiShoppingCart className="text-2xl" />
          <p className="hidden md:block">All Products</p>
        </Link>
        <Link to="" className="flex items-center gap-2">
          <HiUsers className="text-2xl" />
          <p className="hidden md:block">Users</p>
        </Link>
      </div>
      <div className=" px-20 md:px-72 ">
        <div className="flex items-center mt-8  justify-between">
          <h1 className="font-bold text-center text-[15px] md:text-3xl">
            Welcome to the dashboard
          </h1>
          <Link to="/" className="absolute right-10 top-8 text-2xl">
            <FaHome />
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDashboard;
