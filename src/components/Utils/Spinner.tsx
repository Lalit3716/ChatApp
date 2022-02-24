import React, { FC } from "react";

const Spinner: FC = () => {
  return (
    <div
      className="w-6 h-6 border-4 border-blue-400 border-solid rounded-full animate-spin"
      style={{
        borderTopColor: "transparent",
      }}
    />
  );
};

export default Spinner;
