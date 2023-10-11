import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export function EP_PHONE_NUMBER_INPUT({
  values,
  placeholder = "Enter phone number",
  country = "NA",
  name,
  label,
}) {
  const onChange = (value) => {
    console.log("changed", value);
    values[name] = value;
  };
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  return (
    <PhoneInput
      country={country}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
