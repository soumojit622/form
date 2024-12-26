import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="w-full flex 
    h-56 items-center justify-center"
    >
      <Loader size="3rem" className="animate-spin" />
    </div>
  );
};

export default Loading;