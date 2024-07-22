import React, { useEffect, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

const Slider = () => {
  const images = [
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2622&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561808843-7adeb9606939?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517524615358-1a73bc3fcf51?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590845947376-2638caa89309?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [current, setCurrent] = useState(0);
  const prevhandle = () => {
    current === 0 ? setCurrent(images.length - 1) : setCurrent(current - 1);
  };
  const nextHandle = () => {
    current === images.length - 1 ? setCurrent(0) : setCurrent(current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextHandle();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="flex items-center select-none  gap-3 w-full flex-col ">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-green-600 hover:bg-neutral-100 transition-all duration-200 cursor-pointer   justify-center items-center rounded-full absolute left-6 md:left-14 hidden md:flex">
          <HiOutlineChevronLeft
            className="cursor-pointer  text- text-black"
            onClick={prevhandle}
          />
        </div>

        <div className="flex">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              className={`${
                current === index ? "block" : "hidden"
              } w-[1300px] h-[150px]  md:w-[180vh] md:h-[300px] rounded-xl object-cover `}
            />
          ))}
        </div>

        <div className="w-10 h-10  bg-green-600 hover:bg-neutral-100 transition-all duration-200 cursor-pointer   justify-center items-center rounded-full absolute right-6 md:right-14 hidden md:flex">
          <HiOutlineChevronRight
            className="cursor-pointer  text- text-black"
            onClick={nextHandle}
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={` ${
              current === index ? "bg-green-600" : ""
            } cursor-pointer bg-black h-1 w-1 md:h-5 md:w-5 rounded-full`}
            onClick={() => {
              setCurrent(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
