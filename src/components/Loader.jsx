import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[10vh]">
      <InfinitySpin
        visible={true}
        width="100"
        height="100"
        color="green"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
