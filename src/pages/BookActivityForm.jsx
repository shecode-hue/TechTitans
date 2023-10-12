import { Formik, Form } from "formik";
import axios from "axios";
import { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { openNotification } from "../helpers/components/toast-notification";
import { EP_BUTTON, EP_INPUT } from "../components";
import { routesDictionary } from "../configs";
import { UserContext } from "../context";
import { LoadingPage } from "../helpers";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const { activities } = routesDictionary;

export const BookActivityForm = () => {
  const navigate = useNavigate();
  const loction = useLocation();
  const { user } = useContext(UserContext);

  const { activity: activeActivity } = loction.state;

  console.log("location", user);
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
        <div className="container" style={{ minHeight: "54vh" }}>
          <div
            className="frame bg-white"
            style={{
              width: "60vh",
            }}
          >
            <div className="formHeader" style={{ textAlign: "center" }}>
              <h3>Book A Seat For {activeActivity.nameOfActivity}</h3>
            </div>
            <div
              style={{
                margin: "1rem",
              }}
            >
              <Formik
                initialValues={{
                  fullname: user?.name,
                  activityName: activeActivity.nameOfActivity,
                  activityId: activeActivity._id,
                  contactNumber: user?.contactNumber,
                  dateOfActivity: activeActivity.dateOfActivity,
                  locationOfActivity: activeActivity.locationOfActivity,
                  timeOfActivity: activeActivity.timeOfActivity,
                  venueOfActivity: activeActivity.venueOfActivity,
                  submitter: user?._id,
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
                      navigate(activities);
                      return;
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
                        <EP_INPUT
                          name={"activityName"}
                          label={"Name of Activity"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          disabled={true}
                          errors={errors}
                          required={true}
                          value={values.activityName}
                        />
                        <EP_INPUT
                          name={"dateOfActivity"}
                          label={"Date of Activity"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          disabled={true}
                          errors={errors}
                          required={true}
                          value={values.dateOfActivity}
                        />
                        <EP_INPUT
                          name={"timeOfActivity"}
                          label={"Time of Activity"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          disabled={true}
                          errors={errors}
                          required={true}
                          value={values.timeOfActivity}
                        />
                        <EP_INPUT
                          name={"locationOfActivity"}
                          label={"Location of Activity"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          disabled={true}
                          errors={errors}
                          required={true}
                          value={values.locationOfActivity}
                        />
                        <EP_INPUT
                          name={"venueOfActivity"}
                          label={"Venue of Activity"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          disabled={true}
                          errors={errors}
                          required={true}
                          value={values.venueOfActivity}
                        />

                        <EP_BUTTON disabled={isSubmitting} text="Book Now" />
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

  return user ? renderForm() : <LoadingPage />;
};

export default BookActivityForm;
