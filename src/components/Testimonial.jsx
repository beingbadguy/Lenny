import React from "react";
import { IoIosStar } from "react-icons/io";

const Testimonial = ({
  noOfStars = 5,
  title = "Exceptional Service!",
  description = "Shopping at Amyis always a pleasure. Their attention to detail and commitment to customer satisfaction really shine through. I’m always delighted with my purchases!",
  name = "John Doe",
  location = "New York, USA",
}) => {
  return (
    <div className="flex-col flex items-start gap-2 justify-center w-[400px] border p-4 text-sm rounded border-neutral-500">
      <div className="flex gap-2">
        {[...Array(noOfStars)].map((_, index) => (
          <span key={index} className="">
            <IoIosStar className="text-yellow-400" />
          </span>
        ))}
      </div>
      <div className="font-bold">{title}</div>
      <div> "{description} "</div>
      <div className="font-bold">{name}</div>
      <div>{location}</div>
    </div>
  );
};

export default Testimonial;
