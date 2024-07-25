import { Link, useNavigate } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import { MasterContext } from "../context/Context";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Button from "../components/Button";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { InfinitySpin } from "react-loader-spinner";
import { MdLocalPhone } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Cart = () => {
  const { cart, user, cartRemove, setCart, products, orderid, setOrderid } =
    useContext(MasterContext);
  const [total, setTotal] = useState([]);
  const [add, setAddress] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);

  const [form, setForm] = useState({
    address: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      return navigate("/login");
    }
    if (
      form.address != "" &&
      form.mobile != "" &&
      form.address.length >= 5 &&
      form.mobile.length === 10
    ) {
      try {
        setLoading(true);

        const ref = doc(db, "users", user.userId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const newuser = docSnap.data();
          await updateDoc(ref, {
            address: form.address,
            mobile: form.mobile,
          });
        }

        setLoading(false);
        setError("");
        setForm({ address: " ", mobile: " " });
        window.location.reload();
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("Please enter valid address and mobile number");
    }
  };

  const orderHandler = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      setCartLoader(true);
      const colRef = doc(db, "users", user.userId);
      const snapshot = await getDoc(colRef);
      if (snapshot.exists()) {
        const userData = snapshot.data();
        const userCart = userData.carts || [];
        // console.log(userCart);

        const NewCol = collection(db, "orders");
        const newOrder = await addDoc(NewCol, {
          userId: user.userId,
          items: userCart,
          createdAt: new Date(),
          amount: total,
          status: "unfullfilled",
        });
        const orderId = newOrder.id;

        await updateDoc(colRef, {
          orders: arrayUnion(orderId),
          carts: [],
        });
        setCart([]);
        setOrderid(newOrder.id);

        try {
          const result = await emailjs.send(
            "service_ugepisv",
            "template_yvqxjcj",
            {
              to_name: user.name, // Recipient's name
              to_email: user.email, // Recipient's email
              order_id: newOrder.id, // Order ID
              user_name: user.name, // User's name
              items: userCart
                .map((item) => `${item.name} x ${item.quantity}`)
                .join(", "), // Ordered items
              total_amount: total, // Total amount of the order
            },
            "zLljRj_R-BGFHqpth"
          );
          navigate("/order");

          setCartLoader(false);

          console.log("SUCCESS!");
        } catch (error) {
          console.log("FAILED...", error.text);
        }
      }
    } catch (error) {
      console.log(error.message);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate("/login");
    }
    if (cart.length === 0) {
      navigate("/subcategories");
    }
  }, []);

  return (
    <div className={`  min-h-[70vh] select-none `}>
      {cartLoader ? (
        <div className="absolute flex items-center justify-center top-[50%] sm:left-[40%]  left-[25%] md:left-[40%] ">
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : null}
      <div className="bg-neutral-200 pt-5 px-6 min-h-[30vh]">
        <div className="flex items-center  text-[12px] sm:text-md md:text-lg   text-green-500 font-medium">
          <Link to="/">Home</Link> <MdChevronRight />
          <Link to="/cart">cart</Link> <MdChevronRight />
          <p className="text-black">Checkout</p>
        </div>
        <div className="mt-10">
          <p className="text-2xl font-bold">Checkout</p>
          <p className="mt-2">Showing your Choices Product</p>
        </div>
      </div>

      {cart.length === 0 && user ? (
        <div className="flex justify-center items-center pt-20 text-center mx-6 text-red-400">
          <p className={`${cartLoader ? "hidden" : ""}`}>
            You do not have anything to checkout at this moment...
          </p>
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
                  : "shadow-md mx-auto w-[90%] sm-[100%] md:w-[100%] mt-[-5vh] bg-white rounded-lg border mb-20 p-4"
              } `}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold">Shipping Address</p>
              </div>
              {user.address.length > 1 ? (
                <div>
                  <div className="mt-4 flex  flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4 ">
                      <IoLocationSharp className="mt-1 text-2xl  text-green-600 " />
                      <div className="">
                        <p className="font-semibold">{user.name},</p>
                        <p className="font-thin">{user.address}</p>
                        {user.mobile && user.mobile ? (
                          <p className="font-medium mt-2 flex items-center gap-2">
                            {" "}
                            <MdLocalPhone />
                            {user?.mobile}
                          </p>
                        ) : (
                          <p className="font-medium text-sm">
                            Contact number unavailable
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className=" border p-2 flex items-center rounded-md cursor-pointer hover:bg-green-50 transition-all duration-300"
                      onClick={() => {
                        setAddress(true);
                      }}
                    >
                      <IoIosAdd />
                      Address
                    </div>
                  </div>
                  {add ? (
                    <div className=" mt-10">
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                      <form>
                        <label>Full address</label>
                        <input
                          type="text"
                          className="border border-black rounded-md mt-1 outline-green-600 p-2 w-full mb-4"
                          name="address"
                          value={form.address}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        <label className="mt-4">Contact No</label>

                        <input
                          type="number"
                          className="border border-black rounded-md mt-1 outline-green-600 p-2 w-full"
                          name="mobile"
                          value={form.mobile}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        <div className="grid gap-8 grid-cols-2 mt-4 text-[13px]">
                          <div
                            onClick={() => {
                              setForm({ address: " ", mobile: " " });
                              setAddress(false);
                            }}
                          >
                            <Button clr="bg-black text-white " text="Cancel" />
                          </div>
                          <Link>
                            <button
                              className="bg-green-600 p-2 w-full text-white hover:scale-95 rounded-md transition-all duration-300 text-center flex justify-center items-center"
                              onClick={(e) => {
                                submitHandler(e);
                              }}
                            >
                              {loading ? (
                                <InfinitySpin
                                  visible={true}
                                  width="50"
                                  height="50"
                                  color="white"
                                  ariaLabel="infinity-spin-loading"
                                />
                              ) : (
                                "Update Address"
                              )}
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>add you new address</div>
              )}
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
              <div className="flex items-center justify-between">
                <p className="text-sm">Order Type</p>
                <p>
                  <span>COD</span>
                </p>
              </div>
              <Link
                to={""}
                onClick={() => {
                  orderHandler();
                }}
              >
                <Button clr="bg-green-600 text-white" text="Place order" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20 flex-col gap-4 mb-24 ">
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
