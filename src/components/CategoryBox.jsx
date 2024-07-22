import React from "react";
import { CiMobile1 } from "react-icons/ci";

const CategoryBox = ({
  type = "electronics",
  icon = <CiMobile1 />,
}) => {
  return (
    <div className="border border-green-500 rounded p-5 flex  flex-col items-center justify-center w-[190px] cursor-pointer min-w-[150px] select-none">
      {icon}
      <p>{type}</p>
    </div>
  );
};

export default CategoryBox;
