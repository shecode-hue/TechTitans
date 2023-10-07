import { Formik, Field, Form } from "formik";
import { Select } from "antd";
import axios from "axios";
import { openNotification } from "../../helpers/components/toastNotification";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { Option } = Select;

const CreateEventForm = () => {
  const navigate = useNavigate();

  function NotifySuccess() {
    openNotification("Success", "Event Created!!!");
  }
  function notifyFailure() {
    openNotification("Error", "Please fill in all fields");
  }
  const selectOptions = ["Participant", "Organiser"];
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
              <h3>Creat Event</h3>
            </div>
            <div
              style={{
                margin: "3rem",
              }}
            >
              <Formik
                initialValues={{
                  categories: "",
                  eventDate: "",
                  eventVenue: "",
                  title: "",
                  description: "",
                  organisers: { name: "", contactNumber: "" },
                  verified: false,
                  location: "",
                  eventSpeakers: { name: "", contactNumber: "" },
                  participantMaxNumber: 300,
                  entertainment: { name: "", contactNumber: "" },
                  eventTime: "",
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
                      }/api/event`,
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
                        padding: "1rem"
                      }}
                    >
                      <h2 className="text-center">Create an Event</h2>
                      <label htmlFor="title">Name of Event</label>
                      <Field
                        id="title"
                        name="title"
                        placeholder="Hackathon Week of Code"
                        value={values.title}
                        required
                      />
                      <label htmlFor="eventDate">Date of Event</label>
                      <Field
                        id="eventDate"
                        name="eventDate"
                        placeholder="19-01-2023"
                        value={values.eventDate}
                        required
                      />

                      <label htmlFor="location">Location of Activity</label>
                      <Field
                        id="location"
                        name="location"
                        placeholder="Pioneers Park, Best street"
                        value={values.location}
                        required
                      />
                      <label htmlFor="pa">Enter maximum number of participants</label>
                      <Field
                        id="participantMaxNumber"
                        name="participantMaxNumber"
                        placeholder="Pioneers Park, Best street"
                        value={values.participantMaxNumber}
                        required
                      />
                      <label htmlFor="pa">Venue</label>
                      <Field
                        id="eventVenue"
                        name="eventVenue"
                        placeholder="Game Center"
                        value={values.eventVenue}
                        required
                      />

                      <label htmlFor="contactNumber">Contact Number</label>
                      <Field
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="08123456789"
                        value={values.contactNumber}
                        required
                      />
                      <label htmlFor="active">Event Category?</label>
                      <Select
                        name="categories"
                        style={{ width: "100%" }}
                        onChange={(value) => (values.categories = value)}
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
                          color: "#ffffff"
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

export default CreateEventForm;
