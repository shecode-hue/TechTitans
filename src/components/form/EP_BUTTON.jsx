import React from "react";

export const EP_BUTTON = ({
  disabled,
  type = "submit",
  text = "Submit",
  style,
  onClick,
  removeMargin = false,
}) => {
  const styles = {
    backgroundColor: "#242323",
    color: "#ffffff",
    ...style,
  };
  return (
    <button
      className={` ${removeMargin ? "" : "my-2"}`}
      style={styles}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default EP_BUTTON;
