import { Formik } from "formik";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../helpers/components/toast-notification";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { Option } = Select;

export const RegisterForm = () => {
  let navigate = useNavigate();
  const selectOptions = ["Participant", "Organiser"];

  // successful submission function
  const handleSuccess = () => {
    openNotification("Success", "You have successfully signed up!");
    navigate("/login", { replace: false });
  };
  // unsuccessful submission function
  const handleError = () => {
    openNotification("Error", "There was an error signing up.");
  };

  return (
    <div className="container">
      <div
        className="frame bg-white"
        style={{
          width: "80%"
        }}
      >
        <div className="formHeader">
          <h3>Register</h3>
        </div>

        <div
          style={{
            margin: "3rem"
          }}
        >
          <Formik
            initialValues={{
              name: "",
              password: "",
              contactNumber: "",
              username: "",
              userType: "",
            }}
            validate={(values) => {}}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(`${ NODE_ENV === "production"
                ? REACT_APP_API_URL_PROD
                : REACT_APP_API_URL_DEV}/api/user`, values)
                .then(function (response) {
                  setSubmitting(false);
                  values.name = "";
                  values.password = "";
                  values.contactNumber = "";
                  values.username = "";
                  values.userType = "";
                  handleSuccess();
                })
                .catch(function (error) {
                  console.log(error);
                  handleError();
                  setSubmitting(false);
                  console.log(error);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  required
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactNumber}
                  required
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // add error handling

                  value={values.username}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                  error={errors.password && touched.password}
                />
                 <label htmlFor="active">Select User Type</label>
                      <Select
                        name="categories"
                        style={{ width: "100%" }}
                        onChange={(value) => (values.userType = value)}
                        required
                      >
                        {selectOptions.map((option) => (
                          <Option value={option.toUpperCase()}>
                            {option.toUpperCase()}
                          </Option>
                        ))}
                      </Select>
                <div className="space space--lg ..."></div>
                <button
                  className="btn-dark"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
