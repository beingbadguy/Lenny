import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { MasterContext } from "../context/Context";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Login = () => {
  const { user, setUser } = useContext(MasterContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (form.email && form.password.length >= 8) {
      try {
        setError("");
        setLoading(true);
        await signInWithEmailAndPassword(auth, form.email, form.password);
        const userdata = auth.currentUser;

        setLoading(false);
        setForm({ email: "", password: "" });
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


  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);
  return (
    <div className="min-h-[80vh] flex items-center flex-col justify-center select-none  ">
      <div className="flex justify-center items-center">
        <CgShoppingBag className="text-green-700 text-3xl" />
        <Link to="/">
          <h2 className={`font-bold sm:text-2xl ml-2 `}>Amy.</h2>
        </Link>
      </div>
      <p className="mt-3  text-sm  px-4 w-full flex items-center justify-center">
        Hi, Welcome Back!
      </p>
      <p className="text-red-400 mt-2 font-medium text-sm pl-8  flex items-center justify-start">
        {error}
      </p>

      <div className=" flex items-center justify-center w-[290px] sm:w-[250px] md:w-[300px]">
        <form
          className="flex gap-2 flex-col w-[300px]  "
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
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
            {" "}
            {loading ? (
              <InfinitySpin
                visible={true}
                width="50"
                height="50"
                color="white"
                ariaLabel="infinity-spin-loading"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm px-6 w-full text-center">
        Dont't have an account?{" "}
        <Link to={"/signup"} className="underline">
          {" "}
          create account
        </Link>
      </p>
    </div>
  );
};

export default Login;
