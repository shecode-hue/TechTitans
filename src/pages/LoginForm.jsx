import React, { useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { openNotification } from "../helpers/components/toast-notification";
import { UserContext } from "../context/User.context";
import { useNavigate } from "react-router-dom";
import { EP_BUTTON, EP_INPUT } from "../components";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

export const LoginForm = () => {
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
          <h3>LOGIN</h3>
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
                  placeholder={"********"}
                  type="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                />

                <div className="space space--lg ..."></div>
                <EP_BUTTON disabled={isSubmitting} />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
