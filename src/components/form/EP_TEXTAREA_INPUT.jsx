import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export const EP_TEXTAREA_INPUT = ({
  placeholder,
  value,
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
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
    />
  </>
);

export default EP_TEXTAREA_INPUT;
