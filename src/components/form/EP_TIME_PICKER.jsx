import React from "react";
import { TimePicker } from "antd";

const format = "HH:mm";

export const EP_TIME_PICKER = ({ values, name, label }) => {
    
  const handleChange = (time, timeString) => {
    values[name] = timeString;
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <TimePicker name={name} format={format} onChange={handleChange} />
    </>
  );
};

export default EP_TIME_PICKER;
