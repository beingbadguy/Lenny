import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Faq = ({ q, a }) => {
  const [faq, setFaq] = useState(false);
  return (
    <div
      className={` ${
        faq ? "h-28" : "h-8 md:h-10 "
      } flex flex-col duration-500 bg-green-500 text-white  overflow-hidden font-bold transition-all w-[330px] lg:w-[600px] cursor-pointer text-sm rounded md:text-lg`}
    >
      <div
        className="flex items-start justify-between p-2  "
        onClick={() => {
          setFaq(!faq);
        }}
      >
        <p>{q}</p>
        <FaCaretDown
          className={` ${
            faq ? "" : " rotate-[90deg] transition-all duration-all"
          } `}
        />
      </div>
      <div className="text-white bg-green-400 p-2 pt-3  pb-7">
        <p>{a}</p>
      </div>
    </div>
  );
};

export default Faq;
