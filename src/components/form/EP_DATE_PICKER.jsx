import { DatePicker } from "antd";

export const EP_DATE_PICKER = ({ values, name, size, label }) => {
  const onChange = (_, dateString) => {
    values[name] = dateString;
  };
  
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <DatePicker onChange={onChange} name={name} size={size} />
    </>
  );
};

export default EP_DATE_PICKER;
