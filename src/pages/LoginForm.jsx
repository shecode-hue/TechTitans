import React, { useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { openNotification } from "../helpers/components/toast-notification";
import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { EP_BUTTON, EP_INPUT } from "../components";
import { useLocalStorage } from "../hooks";
import { routesDictionary } from "../configs";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const { activities, register } = routesDictionary;

export const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("user");
  function NotifySuccess(message) {
    openNotification("Success", `Hi, ${message}`);
    navigate(activities);
  }

  function notifyFailure() {
    openNotification("Error", "Invalid username or password");
  }

  return (
    <div className="container " style={{ minHeight: "54vh" }}>
      <div
        className="frame bg-white"
        style={{
          width: "50vh",
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
                .then(function (response) {
                  const { data } = response;
                  const { user } = data;
                  if (user) {
                    setUser(user);
                    setItem(user);
                    setSubmitting(false);
                    values.username = "";
                    values.password = "";

                    NotifySuccess(user.name);
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
                <Link to={register}>Don't have an account? Register here</Link>
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
