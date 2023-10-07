import { Formik, Field, Form } from "formik";
import { Select } from "antd";
import axios from "axios";
import { openNotification } from "../../helpers/components/toastNotification";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { Option } = Select;

const BookEventForm = () => {
  const navigate = useNavigate();

  function NotifySuccess() {
    openNotification("Success", "Booking Created!!!");
  }
  function notifyFailure() {
    openNotification("Error", "Please fill in all fields");
  }
  const selectOptions = ["Hackathon", "Workshop", "Conference"];
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
              width: "80%",
            }}
          >
            <div className="formHeader">
              <h3>Book Event</h3>
            </div>
            <div
              style={{
                margin: "3rem",
              }}
            >
              <Formik
                initialValues={{
                    fullname: "",
                  eventName: "",
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
                      }/api/book-event`,
                      values
                    )
                    .then(function (response) {
                      setSubmitting(false);
                      NotifySuccess();
                      navigate("/events");
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
                  handleSubmit,
                  isSubmitting,
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
                        <label htmlFor="fullname">Fullname</label>
                        <Field
                          id="fullname"
                          name="fullname"
                          placeholder="Hackathon Week of Code"
                          value={values.fullname}
                          required
                        />
                        <label htmlFor="contactNumber">Contact Number</label>
                        <Field
                          id="contactNumber"
                          name="contactNumber"
                          placeholder="0811234567"
                          value={values.contactNumber}
                          required
                        />
                        <label htmlFor="eventName">Select Event</label>
                        <Select
                          name="eventName"
                          style={{ width: "100%" }}
                          onChange={(value) => (values.eventName = value)}
                          required
                        >
                          {selectOptions.map((option) => (
                            <Option value={option.toUpperCase()}>
                              {option.toUpperCase()}
                            </Option>
                          ))}
                        </Select>
                        <button
                          className="my-2"
                          style={{
                            backgroundColor: "#242323",
                            color: "#ffffff",
                          }}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
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

export default BookEventForm;
