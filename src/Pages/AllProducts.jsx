import React, { useContext } from "react";
import { MasterContext } from "../context/Context";

const AllProducts = () => {
  const { products } = useContext(MasterContext);
  return (
    <div className="mt-8 ">
      <p className="font-bold">Total Products ({products.length})</p>

      {products.map((item, index) => (
        <div key={index} className="flex items-center justify-between border-b-2 w-full p-2">
          <img src={item.images} className="w-20 h-20" />
          <h3>{item.name}</h3>
          <p> ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
