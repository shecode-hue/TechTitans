import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { EP_INPUT, EP_SELECT, EP_TEXTAREA_INPUT } from "../components";
import { createActivityFormModel } from "../form-models";
import { routesDictionary } from "../configs/routes-dictionary";
import { activityCategories } from "../configs";
import { openNotification } from "../helpers/components/toast-notification";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { activities } = routesDictionary;

export const CreateActivityForm = () => {
  const navigate = useNavigate();

  function NotifySuccess() {
    openNotification("Success", "activity Created!!!");
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
              width: "80%",
            }}
          >
            <div className="formHeader">
              <h3 style={{ fontSize: "bold", fontFamily: "system-ui" }}>
                CREATE ACTIVITY
              </h3>
            </div>
            <div
              style={{
                margin: "3rem",
              }}
            >
              <Formik
                initialValues={createActivityFormModel}
                validate={(values) => {}}
                onSubmit={(values, { setSubmitting }) => {
                  axios
                    .post(
                      `${
                        NODE_ENV === "production"
                          ? REACT_APP_API_URL_PROD
                          : REACT_APP_API_URL_DEV
                      }/api/activity`,
                      values
                    )
                    .then(function (response) {
                      setSubmitting(false);
                      NotifySuccess();
                      navigate(activities);
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
                  errors,
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
                        <EP_INPUT
                          name={"nameOfActivity"}
                          value={values.nameOfActivity}
                          label={"Name of Activity"}
                          placeholder={"Hackathon Week of Code"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"title"}
                          value={values.title}
                          label={"Name of Activity"}
                          placeholder={"Hackathon Week of Code"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <label htmlFor="activityDate">Date of Activity</label>
                        <Field
                          id="activityDate"
                          name="activityDate"
                          placeholder="19-01-2023"
                          value={values.activityDate}
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
                        <label htmlFor="pa">
                          Enter maximum number of participants
                        </label>
                        <Field
                          id="participantMaxNumber"
                          name="participantMaxNumber"
                          placeholder="Pioneers Park, Best street"
                          value={values.participantMaxNumber}
                          required
                        />
                        <label htmlFor="pa">Venue</label>
                        <Field
                          id="activityVenue"
                          name="activityVenue"
                          placeholder="Game Center"
                          value={values.activityVenue}
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

                        <EP_TEXTAREA_INPUT
                          placeholder="Enter the description for the activity"
                          value={values.description}
                          name="description"
                          label="Description"
                        />
                        <EP_SELECT
                          name={"categories"}
                          values={"values"}
                          selectOptions={activityCategories}
                          label={"Activity Category"}
                        />

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

export default CreateActivityForm;
