import React from "react";

const Button = ({
  text = "View Details ",
  clr = "text-white",
  bgclr = "bg-black",
  border = "",
}) => {
  return (
    <div
      className={`${border}   ${clr} ${bgclr} rounded transition-all duration-500 cursor-pointer flex items-center justify-center  hover:scale-95 select-none p-2`}
    >
      {text}
    </div>
  );
};

export default Button;
