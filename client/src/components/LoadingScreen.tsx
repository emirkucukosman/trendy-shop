import React from "react";
import Loading from "src/svgs/loading.svg";

const LoadingScreen = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <img src={Loading} alt="loading" width="70" height="70" className="animate-spin mt-12" />
    </div>
  );
};

export default LoadingScreen;
