import React from "react";
import Sign from "./Sign";
import Login from "./Login";
import { useContext } from "react";
import { MasterContext } from "../context/Context";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const User = () => {
  const { user, logout } = useContext(MasterContext);
  // console.log(user);
  return (
    <div className="min-h-[70vh]  w-full  select-none mx-6 pt-4">
      <div className="flex items-center gap-1 text-[12px] sm:text-md md:text-lg">
        <Link to="/" className="text-green-500">
          Home
        </Link>
        <MdChevronRight className="text-green-500" />
        <Link to="/user">Profile</Link>
      </div>
      <div className="">
        {user ? (
          <div className="grid grid-cols-1  place-items-center justify-items-center ">
            <p className="font-bold mt-4">Account Info</p>

            <div className="bg-blue-100 grid grid-cols-1 mr-12 place-items-center justify-items-center  w-auto  md:w-[600px] p-7 mt-10 gap-5 rounded relative ">
              <img
                src="https://cdn.pixabay.com/photo/2023/04/30/04/29/anime-7959691_960_720.jpg"
                alt=""
                className="h-20 w-20 object-cover rounded-full mt-10"
              />
              <p className="font-bold"> Hi, {user.name.toUpperCase()}</p>
              <p className="w-[200px]">{user.email}</p>

              <div
                className=" p-2 cursor-pointer absolute top-0 right-0 m-2"
                onClick={() => {
                  logout();
                }}
              >
                <CiLogout />
              </div>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default User;
