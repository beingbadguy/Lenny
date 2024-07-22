import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({ noOfStars }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        index = index + 1;
        return (
          <div key={index} className="flex gap-1">
            <TiStarFullOutline
              className={`${index <= noOfStars ? "text-yellow-400" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
