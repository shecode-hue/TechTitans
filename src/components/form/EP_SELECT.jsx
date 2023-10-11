import { Select } from "antd";

const { Option } = Select;

export const EP_SELECT = ({ name, selectOptions, values, label }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        style={{ width: "100%" }}
        onChange={(value) => (values[name] = value)}
        required
      >
        {selectOptions.map((option) => (
          <Option value={option.toUpperCase()}>{option.toUpperCase()}</Option>
        ))}
      </Select>
    </>
  );
};

export default EP_SELECT;
