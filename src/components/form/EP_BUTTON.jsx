import React from "react";

export const EP_BUTTON = ({ disabled, type = "submit", text = "Submit" }) => {
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
      {text}
    </button>
  );
};

export default EP_BUTTON;
