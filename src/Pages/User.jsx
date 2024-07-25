import React, { useEffect, useState } from "react";
import Sign from "./Sign";
import Login from "./Login";
import { useContext } from "react";
import { MasterContext } from "../context/Context";
import { MdChevronRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import moment from "moment";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const User = () => {
  const { user, logout } = useContext(MasterContext);
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.userId));
      const querySnapshot = await getDocs(q);

      const ordersList = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });

      setOrders(ordersList);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(orders);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className=" min-h-[75vh] w-full  select-none  ">
      <div className="bg-neutral-200 pt-5 px-6 min-h-[30vh]">
        <p className="flex items-center  text-[12px] sm:text-md md:text-lg   text-green-500 font-medium">
          <Link to="/">Home</Link> <MdChevronRight />
          <span className="text-black">user</span>
        </p>
        <div className="mt-10">
          <p className="text-2xl font-bold">User</p>
          <p className="mt-2">Showing your Profile</p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-10 ">
        {user ? (
          <div className=" w-full mx-12 bg-white">
            <div className="bg-white shadow-md grid grid-cols-1 place-items-center justify-items-center  w-full   p-7 mt-[-30px] gap-5 rounded relative ">
              <img
                src="https://cdn.pixabay.com/photo/2023/04/30/04/29/anime-7959691_960_720.jpg"
                alt=""
                className="h-20 w-20 object-cover rounded-full mt-10"
              />
              <p className="font-bold"> Hi, {user.name.toUpperCase()}</p>
              <p className="w-[200px] text-center">{user.email}</p>

              <div
                className=" p-2 cursor-pointer absolute top-0 right-0 m-2"
                onClick={() => {
                  logout();
                  window.location.reload();
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
      <div className="mx-6 pb-20">
        <p className="font-bold">Your Orders ({orders?.length})</p>
        <div className=" grid gap-4">
          {orders &&
            orders.map((item, index) => {
              const timeCreate =
                item.createdAt.seconds*1000 + item.createdAt.nanoseconds / 1000000;
              const date = new Date(timeCreate);
              const finalDate = date.toLocaleString();

              return (
                <div key={index} className="border shadow-md mt-8">
                  <div className="bg-neutral-50 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4  rounded-md text-sm ">
                    <div>
                      <p>
                        Order ID #{" "}
                        <span className="font-medium">{item.id}</span>
                      </p>
                    </div>
                    <div>
                      <p>Order Date:</p>
                      <p>{finalDate}</p>
                    </div>
                    <div>
                      <p
                        className={`${
                          item.status === "unfullfilled"
                            ? "bg-orange-200"
                            : "bg-green-400"
                        } p-1 rounded-3xl w-[100px] flex justify-center items-center`}
                      >
                        {item.status}
                      </p>
                    </div>
                    <div>
                      <p>Total</p>
                      <p className="font-bold text-green-500">₹{item.amount}</p>
                    </div>
                  </div>
                  <div className="mt-4 mx-4 grid grid-cols-1 gap-5 mb-5">
                    {item.items.map((product, index) => (
                      <div key={index} className="grid grid-cols-2">
                        <div className="bg-neutral-200 h-28 w-28 flex justify-center items-center rounded-sm">
                          <img
                            src={product.images}
                            alt=""
                            className="h-20 w-20"
                          />
                        </div>
                        <div className="text-sm flex flex-col gap-2">
                          <p className="font-bold">{product.name}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>
                            <span className="font-medium text-green-500">
                              ₹{product.price * product.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default User;
