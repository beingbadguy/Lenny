import React from "react";
import { CiMobile1 } from "react-icons/ci";

const CategoryBox = ({
  type = "electronics",
  icon = <CiMobile1 />,
}) => {
  return (
    <div className="border border-green-500 rounded p-5 flex  flex-col items-center justify-center  cursor-pointer min-w-[180px] select-none hover:bg-green-50 hover:shadow-md transition-all duration-300">
      {icon}
      <p>{type}</p>
    </div>
  );
};

export default CategoryBox;
