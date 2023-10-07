import React, { useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { openNotification } from "../../helpers/components/toastNotification";
import { UserContext } from "../../context/User.context";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const SignInForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function NotifySuccess() {
    openNotification("Success", "You have successfully logged in");
    navigate("/home");
  }

  function notifyFailure() {
    openNotification("Error", "Invalid username or password");
  }

  return (
    <div className="container ">
      <div
        className="frame bg-white"
        style={{
          width: "60%",
        }}
      >
        <div className="formHeader">
          <h3>Sign In</h3>
        </div>
        <div
          style={{
            margin: "3rem",
          }}
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              axios
                .post(
                  `${
                    NODE_ENV === "production"
                      ? REACT_APP_API_URL_PROD
                      : REACT_APP_API_URL_DEV
                  }/api/login`,
                  values
                )
                .then(function (user) {
                  const { data } = user;
                  setUser(data);
                  localStorage.setItem("user", JSON.stringify(data));
                  if (data.name) {
                    setSubmitting(false);
                    values.username = "";
                    values.password = "";

                    NotifySuccess();
                  } else {
                    notifyFailure();
                  }
                })
                .catch(function (error) {
                  setSubmitting(false);
                  notifyFailure();
                  console.log(error);
                });
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  required
                  value={values.username}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  required
                  value={values.password}
                />

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

export default SignInForm;
