import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MasterContext } from "../context/Context";
import { IoCloseOutline } from "react-icons/io5";

const Layout = () => {
  const { products, user } = useContext(MasterContext);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState(false);
  const inpRef = useRef();

  const newArr = products.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {}, []);

  return (
    <div className="select-none">
      <div className="flex justify-between shadow-sm  items-center p-3 sm:p-6  bg-neutral-50">
        <div className="flex justify-center items-center">
          <CgShoppingBag className="text-green-700 text-3xl" />
          <Link to="/">
            <h2 className={`font-bold sm:text-2xl ${search ? "hidden" : ""} `}>
              Lenny.
            </h2>
          </Link>
        </div>
        <div
          className={`" ${
            search ? " translate-y-[0px]  " : " translate-y-[-600px] "
          } sm:translate-y-0 absolute sm:static flex justify-center sm:w-[80%]  items-center left-12 rounded  transition-all duration-100     "`}
        >
          <div className="sm:border-t sm:border-l sm:border-b  border-black p-2 rounded-l min-w-20  sm:flex items-center justify-center hidden ">
            <p>All</p>
          </div>
          <div className="sm:flex justify-between items-center bg-white  sm:border-black w-[200px]  sm:w-[300px] md:w-[330px] lg:w-[500px]  p-1 rounded-r relative sm:border-t sm:border-r sm:border-b   ">
            <input
              type="text"
              value={query}
              ref={inpRef}
              onChange={(e) => {
                setQuery(e.target.value);
                setShow(true);
              }}
              placeholder="Search anything on lenny..."
              className="outline-none sm:px-2 sm:py-1 w-[190px]   sm:w-[300px] md:w-[330px]  lg:w-[530px] overflow-hidden"
            />
            <CiSearch className=" text-3xl hidden md:block  cursor-pointer" />

            {query.length > 0 && show ? (
              <div className="absolute top-12 left-0 min-w-[200px] sm:left-[-80px]   sm:min-w-[380px]  md:min-w-[410px]  lg:w-[580px]  bg-neutral-100 duration-500 transition-all rounded-b-md  z-[9999]  overflow-y-scroll  h-[370px] md:max-h-[370px]  border border-black-2 ">
                <div className="flex flex-col gap-4 ">
                  {newArr &&
                    newArr.map((item, index) => (
                      <Link
                        key={index}
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setShow(false);
                          setQuery("");
                          setSearch(false);
                        }}
                      >
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-200 p-4 "
                        >
                          <img
                            src={item.images}
                            className=" h-10 w-10 sm:w-18 sm:h-18"
                          />
                          <h3 className="text-[10px] w-[80px] sm:w-auto sm:text-md md:text-lg">
                            {item.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center items-center gap-1 md:gap-3 ">
          {search ? (
            <IoCloseOutline
              className="text-2xl sm:hidden "
              onClick={() => {
                setSearch(false);
                setQuery("");
              }}
            />
          ) : (
            <CiSearch
              className=" text-2xl sm:hidden"
              onClick={() => {
                setSearch(true);
                inpRef.current.focus();
              }}
            />
          )}

          <Link to="/cart">
            <CiBag1 className="text-2xl sm:text-3xl cursor-pointer" />
          </Link>
          <Link to="/wish" className="hidden md:block">
            <CiHeart className=" text-2xl sm:text-3xl cursor-pointer" />
          </Link>
          <Link to="/user">
            <IoPersonCircle className="text-2xl sm:text-3xl cursor-pointer" />
          </Link>
          {user && user.role === "admin" ? (
            <Link to="/dashboard" className="hidden md:block">
              <RxDashboard className="text-2xl sm:text-3xl cursor-pointer" />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <Outlet />
      <div className="flex flex-wrap items-start justify-evenly  bg-[#e8e9ea65] py-8 gap-3 px-5 text-sm">
        <div className="flex flex-col items-start w-[300px]">
          <div className="flex justify-center items-center">
            <CgShoppingBag className="text-green-700 text-2xl" />
            <h2 className="font-bold">Lenny.</h2>
          </div>
          <p>
            The biggest marketplace managed by Ideologist corp, which provides
            various kinds of daily needs and hobbies
          </p>
        </div>
        <div>
          <p className="font-bold">About lenny</p>
          <ul>
            <li>Information</li>
            <li>Store lactor</li>
            <li>Bulk Purchase</li>
            <li>Alteration services</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">About lenny</p>
          <ul>
            <li>Information</li>
            <li>Store lactor</li>
            <li>Bulk Purchase</li>
            <li>Alteration services</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">About lenny</p>
          <ul>
            <li>Information</li>
            <li>Store lactor</li>
            <li>Bulk Purchase</li>
            <li>Alteration services</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">About lenny</p>
          <ul>
            <li>Information</li>
            <li>Store lactor</li>
            <li>Bulk Purchase</li>
            <li>Alteration services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
