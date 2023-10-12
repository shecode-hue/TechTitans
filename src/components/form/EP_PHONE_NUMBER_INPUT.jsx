import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export function EP_PHONE_NUMBER_INPUT({
  values,
  placeholder = "81 123 4567",
  country = "NA",
  name,
  label,
  setFieldValue,
}) {
  const onChange = (value) => {
    if (value && value.replace(/\D/g, "").length === 9) {
      setFieldValue(name, value);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <PhoneInput
        numberInputProps={{ name: name }}
        value={values[name]}
        defaultCountry={"NA"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
