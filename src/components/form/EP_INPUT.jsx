export const EP_INPUT = ({
  name,
  value,
  label,
  placeholder,
  handleChange,
  handleBlur,
  errors,
  type = "text",
  required = false,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors[name]}
        required={required}
        value={value}
      />
    </>
  );
};

export default EP_INPUT;
