import React from "react";
import { Select } from "antd";

export const EP_MULTIPLE_SELECT = ({
  options,
  placeholder,
  defaultValue,
  allowClear = true,
  values,
  name,
  label,
  showSearch = false
}) => {
  const handleChange = (value) => {
    values[name] = value;
  };

  const selectOptions = options.map((option) => {
    return {
      value: option,
      label: option,
    };
  });

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Select
        showSearch={showSearch}
        mode="multiple"
        allowClear={allowClear}
        style={{
          width: "100%",
        }}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        options={selectOptions}
      />
    </>
  );
};
export default EP_MULTIPLE_SELECT;
