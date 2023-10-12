import { Select } from "antd";

const { Option } = Select;

export const EP_SELECT = ({ name, selectOptions, values, label }) => {
  
  const handleOnChange = (value) => {
    values[name] = value;
  };  
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        style={{ width: "100%" }}
        onChange={handleOnChange}
        required
      >
        {selectOptions.map((option, index) => (
          <Option key={index} value={option.toUpperCase()}>
            {option.toUpperCase()}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default EP_SELECT;
