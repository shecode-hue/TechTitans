import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export const EP_TEXTAREA_INPUT = ({
  placeholder,
  handleChange,
  name,
  label,
  rows = 4,
  maxLength = 200,
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <TextArea
      name={name}
      rows={rows}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  </>
);

export default EP_TEXTAREA_INPUT;
