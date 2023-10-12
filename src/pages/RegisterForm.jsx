import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { openNotification } from "../helpers/components/toast-notification";
import {
  EP_BUTTON,
  EP_INPUT,
  EP_PHONE_NUMBER_INPUT,
  EP_SELECT,
} from "../components";
import { userTypes, routesDictionary } from "../configs";
import { registerFormModel } from "../form-models";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const { login } = routesDictionary;

export const RegisterForm = () => {
  let navigate = useNavigate();

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
          width: "60vh",
        }}
      >
        <div className="formHeader">
          <h3>REGISTER</h3>
        </div>

        <div
          style={{
            margin: "3rem",
          }}
        >
          <Formik
            initialValues={registerFormModel}
            validate={(values) => {}}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(
                  `${
                    NODE_ENV === "production"
                      ? REACT_APP_API_URL_PROD
                      : REACT_APP_API_URL_DEV
                  }/api/register`,
                  values
                )
                .then(function () {
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
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <EP_INPUT
                    name={"name"}
                    value={values.name}
                    label={"Name"}
                    placeholder={"John Doe"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <EP_INPUT
                    name={"username"}
                    value={values.username}
                    label={"Username"}
                    placeholder={"elegantMuse"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />

                  <EP_INPUT
                    name={"password"}
                    value={values.password}
                    label={"Password"}
                    type="password"
                    placeholder={"********"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <EP_PHONE_NUMBER_INPUT
                    name={"contactNumber"}
                    values={values}
                    setFieldValue={setFieldValue}
                    label={"Contact Number"}
                  />
                  <EP_SELECT
                    values={values}
                    selectOptions={userTypes}
                    label={"Select User Type"}
                    name={"userType"}
                  />
                  <Link to={login}>Already have an account? Login here</Link>

                  <div className="space space--lg ..."></div>
                  <EP_BUTTON disabled={isSubmitting} />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
