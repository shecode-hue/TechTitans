import React from "react";
import { InputNumber } from "antd";

export const EP_MONEY_INPUT = ({ name, values, label }) => {
  const onChange = (value) => {
    console.log("changed", value);
    values[name] = value;
  };
  return (
    <div className="my-1">
      <label className="ml-1" htmlFor={name}>
        {label}
      </label>
      <InputNumber
        name={name}
        style={{ width: "100%" }}
     
        onChange={onChange}
      />
    </div>
  );
};
