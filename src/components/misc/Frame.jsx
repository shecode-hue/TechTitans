import React from "react";

export const Frame = ({ content, width = "60vh" }) => {
  return (
    <div
      className="frame bg-white"
      style={{
        width: { width },
        margin: "auto 1rem",
      }}
    >
      {content}
    </div>
  );
};

export default Frame;
