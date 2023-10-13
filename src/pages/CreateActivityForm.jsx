import { Formik, Form } from "formik";
import axios from "axios";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  EP_INPUT,
  EP_SELECT,
  EP_TEXTAREA_INPUT,
  EP_DATE_PICKER,
  EP_TIME_PICKER,
  EP_MULTIPLE_SELECT,
  EP_MONEY_INPUT,
  EP_PHONE_NUMBER_INPUT,
} from "../components";
import { createActivityFormModel } from "../form-models";
import { routesDictionary } from "../configs/routes-dictionary";
import { activityCategories, targetAudience } from "../configs";
import { openNotification } from "../helpers/components/toast-notification";
import { useIsMobile } from "../hooks";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { activities } = routesDictionary;

export const CreateActivityForm = () => {
  const navigate = useNavigate();
  const {isMobile} = useIsMobile();

  function NotifySuccess() {
    openNotification("Success", "Activity Created!!!");
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
              width: isMobile ?"60vh" : "88vh",
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
                  setFieldValue,
                  errors,
                  isSubmitting,
                }) => {
                  const { name, email, institution, designation } =
                    values.personOfferingActivity;
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
                        <EP_DATE_PICKER
                          values={values}
                          name="dateOfActivity"
                          label={"Date of Activity"}
                        />
                        <EP_TIME_PICKER
                          values={values}
                          name="timeOfActivity"
                          label={"Time of Activity"}
                        />

                        <EP_INPUT
                          name={"locationOfActivity"}
                          value={values.locationOfActivity}
                          label={"Location of Activity"}
                          placeholder={"Windhoek, Namibia"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"hostInstitution"}
                          value={values.hostInstitution}
                          label={"Host Institution"}
                          placeholder={"UNAM"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"venueOfActivity"}
                          value={values.venueOfActivity}
                          label={"Venue of Activity"}
                          placeholder={"Plaza Hotel"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_MONEY_INPUT
                          values={values}
                          name={"budget"}
                          label={"Budget for Activity"}
                        />
                        <EP_PHONE_NUMBER_INPUT
                          label={"Contact Number of Person Offering Activity"}
                          values={values}
                          setFieldValue={setFieldValue}
                          name={"personOfferingActivity.contactNumber"}
                        />
                        <EP_INPUT
                          name={"personOfferingActivity.name"}
                          value={name}
                          label={"Name of Person Offering Activity"}
                          placeholder={"John Doe"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"personOfferingActivity.email"}
                          value={email}
                          label={"Email Address of Person Offering Activity"}
                          type="email"
                          placeholder={"john@mail.com"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"personOfferingActivity.institution"}
                          value={institution}
                          label={"Institution of Person Offering Activity"}
                          placeholder={"UNAM"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"personOfferingActivity.designation"}
                          value={designation}
                          label={"Designation of Person Offering Activity"}
                          placeholder={"Designation"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"fundingSource"}
                          value={values.fundingSource}
                          label={"Source of Funding"}
                          placeholder={"UNAM"}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                        <EP_INPUT
                          name={"numberOfParticipants"}
                          value={values.numberOfParticipants}
                          label={"Number of Participants"}
                          placeholder={300}
                          type="number"
                          handleChange={(e) => {
                            // Remove leading zeros from the input value
                            const inputValue = e.target.value.replace(
                              /^0+/,
                              ""
                            );
                            e.target.value = inputValue;
                            // Pass the modified value to the parent component's handleChange function
                            handleChange(e);
                          }}
                          handleBlur={handleBlur}
                          errors={errors}
                        />

                        <EP_MULTIPLE_SELECT
                          options={targetAudience}
                          placeholder="Select target audience(s)"
                          values={values}
                          name="targetAudience"
                          label="Select target audience(s)"
                        />

                        <EP_TEXTAREA_INPUT
                          handleChange={handleChange}
                          placeholder="Enter the resources required for the activity"
                          value={values.resourcesRequired}
                          name="resourcesRequired"
                          label="Resources Required"
                        />
                        <EP_TEXTAREA_INPUT
                          handleChange={handleChange}
                          placeholder="Enter the description for the activity"
                          value={values.descriptionOfActivity}
                          name="descriptionOfActivity"
                          label="Description of Activity"
                        />
                        <EP_SELECT
                          name={"categoryOfActivity"}
                          values={values}
                          selectOptions={activityCategories}
                          label={"Category of Activity"}
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
