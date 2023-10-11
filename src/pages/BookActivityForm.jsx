import { Formik, Form } from "formik";
import axios from "axios";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../helpers/components/toast-notification";
import { EP_BUTTON, EP_INPUT, EP_SELECT } from "../components";
import { activityCategories } from "../configs";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

export const BookActivityForm = () => {
  const navigate = useNavigate();

  function NotifySuccess() {
    openNotification("Success", "Booking Created!!!");
  }
  function notifyFailure() {
    openNotification("Error", "Please fill in all fields");
  }

  function renderForm() {
    return (
      <Fragment>
        <button
          className="bg-dark text-light"
          onClick={() => {
            navigate(-1);
          }}
          style={{
            position: "fixed",
            display: "flex",
            left: "1em",
            top: "6.5em",
          }}
        >
          Back
        </button>
        <div className="container">
          <div
            className="frame bg-white"
            style={{
              width: "60vh",
            }}
          >
            <div className="formHeader">
              <h3>Book activity</h3>
            </div>
            <div
              style={{
                margin: "3rem",
              }}
            >
              <Formik
                initialValues={{
                  fullname: "",
                  activityName: "",
                  contactNumber: "",
                }}
                validate={(values) => {}}
                onSubmit={(values, { setSubmitting }) => {
                  axios
                    .post(
                      `${
                        NODE_ENV === "production"
                          ? REACT_APP_API_URL_PROD
                          : REACT_APP_API_URL_DEV
                      }/api/book-activity`,
                      values
                    )
                    .then(function (response) {
                      setSubmitting(false);
                      NotifySuccess();
                      navigate("/activitys");
                    })
                    .catch(function (error) {
                      notifyFailure();
                      setSubmitting(false);
                      console.log(error);
                    });
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  errors,
                }) => {
                  return (
                    <Form>
                      <div
                        className="frame"
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "2px",
                          padding: "1rem",
                        }}
                      >
                        <EP_INPUT
                          name={"fullname"}
                          label={"Fullname"}
                          placeholder={"Hackathon Week of Code"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                          required={true}
                          value={values.fullname}
                        />

                        <EP_INPUT
                          name={"contactNumber"}
                          label={"Contact Number"}
                          placeholder={"0811234567"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                          required={true}
                          value={values.contactNumber}
                        />
                        <EP_SELECT
                          name={"activityName"}
                          selectOptions={activityCategories}
                          values={values}
                          label={"Select activity"}
                        />
                        <EP_BUTTON disabled={isSubmitting} />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return renderForm();
};

export default BookActivityForm;
