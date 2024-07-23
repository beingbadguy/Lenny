import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { MasterContext } from "../context/Context";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Sign = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);



  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.password.length >= 8) {
      try {
        setError("");
        setLoading(true);
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        const userdata = auth.currentUser;
        // console.log(userdata);
        if (userdata) {
          await setDoc(doc(db, "users", userdata.uid), {
            name: form.name,
            email: form.email,
            userId: userdata.uid,
            carts: [],
            favourites: [],
            role: "user",
            address: "Jwala nagar",
          });
        }
        setLoading(false);
        setForm({ name: "", email: "", password: "" });
        navigate("/");

      } catch (error) {
        setLoading(false);

        setError(error.message);
      }
    } else {
      setLoading(false);
      setError("Please fill all the fields");
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center flex-col justify-center select-none ">
      <div className="flex justify-center items-center">
        <CgShoppingBag className="text-green-700 text-3xl" />
        <Link to="/">
          <h2 className={`font-bold sm:text-2xl ml-2 `}>Lenny.</h2>
        </Link>
      </div>
      <p className="mt-3 text-sm px-4 w-full flex items-center justify-center">
        Hi, Welcome Back!
      </p>
      <p className="text-red-400 mt-2 font-medium text-sm pl-8 w-full flex items-center justify-start">
        {error}
      </p>

      <div className=" flex items-center justify-center">
        <form
          className="flex gap-2 flex-col w-[290px] sm:w-[250px] md:w-[300px]  "
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => {
              formHandler(e);
            }}
            className="border border-black outline-green-500 p-2 rounded"
          />
          <label>Email</label>

          <input
            type="text"
            name="email"
            value={form.email}
            onChange={(e) => {
              formHandler(e);
            }}
            className="border border-black outline-green-500 p-2 rounded"
          />
          <label>Password</label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={(e) => {
                formHandler(e);
              }}
              className="border border-black outline-green-500 p-2 w-full rounded"
            />
            {show ? (
              <LuEye
                className="absolute top-[30%] right-2"
                onClick={() => {
                  setShow(!show);
                }}
              />
            ) : (
              <LuEyeOff
                className="absolute top-[30%] right-2"
                onClick={() => {
                  setShow(!show);
                }}
              />
            )}
          </div>
          <button className=" border rounded bg-green-500 p-2 flex items-center justify-center">
            {loading ? (
              <InfinitySpin
                visible={true}
                width="50"
                height="50"
                color="white"
                ariaLabel="infinity-spin-loading"
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm px-6 w-full text-center">
        Already have an account ?{" "}
        <Link to={"/login"} className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Sign;
