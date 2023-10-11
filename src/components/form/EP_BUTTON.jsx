import React from "react";

export const EP_BUTTON = ({ disabled, type = "submit" }) => {
  return (
    <button
      className="my-2"
      style={{
        backgroundColor: "#242323",
        color: "#ffffff",
      }}
      type={type}
      disabled={disabled}
    >
      Submit
    </button>
  );
};

export default EP_BUTTON;
