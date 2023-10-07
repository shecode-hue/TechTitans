import { Formik } from "formik";
import { Select } from "antd";
import axios from "axios";
import { openNotification } from "../../helpers/components/toastNotification";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;
const { Option } = Select;

const FireForm = () => {
  const navigate = useNavigate();

  function NotifySuccess() {
    openNotification("Success", "Fire recorded successfully");
  }
  function notifyFailure() {
    openNotification("Error", "Please fill in all fields");
  }
  // function to calculate the time taken given a start time as time string and end time as time string return the time taken in minutes
  function calculateTimeTaken(startTime, endTime, totalTimeOut) {
    const start = new Date("01/01/2007 " + startTime);
    const end = new Date("01/01/2007 " + endTime);
    const diff = end.getTime() - start.getTime();
    let minutes = Math.floor(diff / 60000);
    // if negative number make positive
    if (minutes < 0) {
      minutes = minutes * -1;
    }
    totalTimeOut = minutes;
    return minutes + "minutes";
  }

  function renderForm() {
    return (
      <Fragment>
        <button
          className="bg-dark text-light"
          onClick={() => {
            // go back
            navigate(-1);
          }}
          style={{
            position: "fixed",
            display: "flex",
            left: "1em",
            top: '6.5em'
          }}
        >
          Back
        </button>
        <div className="container">
          <div
            className="frame bg-white"
            style={{
              width: "80%"
            }}
          >
            <div className="formHeader">
              <h3>Fire Report</h3>
            </div>
            <div
              style={{
                margin: "3rem"
              }}
            >
              <Formik
                initialValues={{
                  town: "Windhoek",
                  callNumber: "",
                  platoon: "A",
                  dateOfReport: "",
                  stationArea: "HQ",
                  typeOfFire: "",
                  locationOfCaller: "OFF SCENE",
                  incidentAddress: "",
                  callerName: "",
                  methodOfReporting: "Cellphone",
                  telephoneNumber: "",
                  otherTypes: "",
                  typeOfVehicle: "",
                  timeDispatched: "",
                  timeCalled: "",
                  timeOfArrival: "",
                  timeIn: "",
                  totalTimeOut: "",
                  originOfFire: "",
                  quantity: "",
                  other: "",
                  methodOfExtinguishing: "",
                  summaryOfIncident: "",
                  nameOfOwner: "",
                  identificationNumber: "",
                  postalAddress: "",
                  residentialAddress: {
                    streetName: "",
                    streetNumber: "",
                    suburb: "",
                    erfNumber: ""
                  },
                  telephoneNumberOfOwner: "",
                  cellphoneNumber: ""
                }}
                validate={(values) => {}}
                onSubmit={(values, { setSubmitting }) => {
                  if (values.dateOfFire === "") values.dateOfFire = undefined;
                  axios
                    .post(
                      `${
                        NODE_ENV === "production"
                          ? REACT_APP_API_URL_PROD
                          : REACT_APP_API_URL_DEV
                      }/addFire`,
                      values
                    )
                    .then(function (response) {
                      setSubmitting(false);
                      NotifySuccess();
                      navigate("/fireTable");
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
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                  /* and other goodies */
                }) => {
                  let { streetName, streetNumber, suburb, erfNumber } =
                    values.residentialAddress;

                  const onChange = (value) => {
                    values.typeOfFire = value;
                  };
                  return (
                    <form onSubmit={handleSubmit}>
                      {/* -------------------------Row 1-------------------------------- */}
                      <div className="row u-no-wrap u-center">
                        {" "}
                        <div className="col-6 ">
                          {" "}
                          <label htmlFor="town" className="font-extrabold">
                            Town
                          </label>
                          <input
                            type="text"
                            name="town"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.town}
                          />
                        </div>
                      </div>
                      <div
                        className="divider"
                        data-content="Department information"
                      ></div>
                      {/* -------------------------Row 2-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-3">
                          <label
                            htmlFor="callNumber"
                            className="font-extrabold"
                          >
                            Call Number
                          </label>
                          <input
                            type="text"
                            name="callNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.callNumber}
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="platoon" className="font-extrabold">
                            Platoon
                          </label>

                          <div className="row u-no-wrap">
                            <div>
                              <input
                                type="radio"
                                id="A"
                                name="platoon"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="A"
                                checked={values.platoon === "A"}
                              />
                              <label htmlFor="A">A</label>

                              <input
                                type="radio"
                                id="B"
                                name="platoon"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="B"
                              />
                              <label htmlFor="B">B</label>

                              <input
                                type="radio"
                                id="C"
                                name="platoon"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="C"
                              />
                              <label htmlFor="C">C</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          {" "}
                          <label
                            htmlFor="dateOfReport"
                            className="font-extrabold"
                          >
                            Date
                          </label>
                          <input
                            type="date"
                            name="dateOfReport"
                            onChange={(date) => {
                              // format date to yyyy-mm-dd
                              let dateOfReport = date.target.value;
                              let dateArray = dateOfReport.split("-");
                              let year = dateArray[0];
                              let month = dateArray[1];
                              let day = dateArray[2];
                              let formattedDate = `${year}-${month}-${day}`;
                              values.dateOfReport = formattedDate;
                            }}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="stationArea"
                            className="font-extrabold"
                          >
                            Station Area
                          </label>
                          <div className="row u-no-wrap">
                            <div>
                              <input
                                type="radio"
                                id="HQ"
                                name="stationArea"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="HQ"
                                checked={values.stationArea === "HQ"}
                              />
                              <label htmlFor="HQ">HQ</label>

                              <input
                                type="radio"
                                id="OTJOMUISE"
                                name="stationArea"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="OTJOMUISE"
                              />
                              <label htmlFor="OTJOMUISE">OTJOMUISE</label>

                              <input
                                type="radio"
                                id="MAX"
                                name="stationArea"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="MAX"
                              />
                              <label htmlFor="MAX">MAX</label>
                              <input
                                type="radio"
                                id="DIAZ"
                                name="stationArea"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="DIAZ"
                              />
                              <label htmlFor="DIAZ">DIAZ</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="divider"
                        data-content="Call information"
                      ></div>

                      {/* -------------------------Row 3-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-3">
                          {" "}
                          <label
                            htmlFor="methodOfReporting"
                            className="font-extrabold"
                          >
                            Method Of Reporting
                          </label>
                          <div className="row u-no-wrap">
                            <div>
                              <input
                                type="radio"
                                id="Cellphone"
                                name="methodOfReporting"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="Cellphone"
                                checked={
                                  values.methodOfReporting === "Cellphone"
                                }
                              />
                              <label htmlFor="Cellphone">Cellphone</label>
                              <input
                                type="radio"
                                id="Telephone"
                                name="methodOfReporting"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="Telephone"
                                checked={
                                  values.methodOfReporting === "Telephone"
                                }
                              />
                              <label htmlFor="Telephone">Telephone</label>
                              <input
                                type="radio"
                                id="Other"
                                name="methodOfReporting"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="Other"
                                checked={values.methodOfReporting === "Other"}
                              />
                              <label htmlFor="Other">Other</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="telephoneNumber"
                            className="font-extrabold"
                          >
                            Telephone Number
                          </label>
                          <input
                            type="text"
                            name="telephoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.telephoneNumber}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="locationOfCaller"
                            className="font-extrabold"
                          >
                            Location Of Caller
                          </label>

                          <div className="row u-no-wrap">
                            <div>
                              <input
                                type="radio"
                                id="OFF SCENE"
                                name="locationOfCaller"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="OFF SCENE"
                                checked={
                                  values.locationOfCaller === "OFF SCENE"
                                }
                              />
                              <label htmlFor="OFF SCENE">OFF SCENE</label>

                              <input
                                type="radio"
                                id="ON SCENE"
                                name="locationOfCaller"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value="ON SCENE"
                              />
                              <label htmlFor="OTJOMUISE">ON SCENE</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="callerName"
                            className="font-extrabold"
                          >
                            Caller Name
                          </label>
                          <input
                            type="text"
                            name="callerName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.callerName}
                          />
                        </div>
                      </div>
                      <div
                        className="divider"
                        data-content="Response Report"
                      ></div>
                      {/* -------------------------Row 4-------------------------------- */}
                      <div className="row u-no-wrap u-center">
                        <div className="col-6">
                          {" "}
                          <label
                            htmlFor="incidentAddress"
                            className="font-extrabold"
                          >
                            Incident Address
                          </label>
                          <input
                            type="text"
                            name="incidentAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.incidentAddress}
                          />
                        </div>
                      </div>
                      {/* -------------------------Row 5-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-2">
                          {" "}
                          <label
                            htmlFor="timeCalled"
                            className="font-extrabold"
                          >
                            Time Called
                          </label>
                          <input
                            type="time"
                            name="timeCalled"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.timeCalled}
                          />
                        </div>
                        <div className="col-2">
                          <label
                            htmlFor="timeDispatched"
                            className="font-extrabold"
                          >
                            Time Dispatched
                          </label>
                          <input
                            type="time"
                            name="timeDispatched"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.timeDispatched}
                          />
                        </div>
                        <div className="col-4">
                          <label
                            htmlFor="timeOfArrival"
                            className="font-extrabold"
                          >
                            Time Of Arrival
                          </label>
                          <input
                            type="time"
                            name="timeOfArrival"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.timeOfArrival}
                          />
                        </div>
                        <div className="col-2">
                          {" "}
                          <label htmlFor="timeIn" className="font-extrabold">
                            Time In
                          </label>
                          <input
                            type="time"
                            name="timeIn"
                            onChange={(e) => {
                              handleChange(e);
                              calculateTimeTaken(
                                values.timeDispatched,
                                values.timeIn,
                                values.totalTimeOut
                              );
                            }}
                            onBlur={handleBlur}
                            value={values.timeIn}
                          />
                        </div>
                        <div className="col-2">
                          <label
                            htmlFor="totalTimeOut"
                            className="font-extrabold"
                          >
                            Total Time Out
                          </label>
                          <input
                            type="text"
                            name="totalTimeTaken"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.totalTimeOut}
                          />
                        </div>
                      </div>
                      <div
                        className="divider"
                        data-content="Fire Information"
                      ></div>
                      {/* -------------------------Row 6-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-4">
                          {" "}
                          <label
                            htmlFor="typeOfFire"
                            className="font-extrabold"
                          >
                            Type Of Fire
                          </label>
                          <Select
                            allowClear
                            size="large"
                            style={{ width: "100%" }}
                            name="typeOfFire"
                            placeholder="Select type of fire"
                            optionFilterProp="children"
                            onChange={onChange}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            <Option value={"grass"}>Grass</Option>
                            <Option value={"building"}>Building</Option>
                            <Option value={"electrical"}>Electrical</Option>
                            <Option value="house">House</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </div>
                        <div className="col-4">
                          {" "}
                          <label
                            htmlFor="otherTypes"
                            className="font-extrabold"
                          >
                            Other Types
                          </label>
                          <input
                            type="text"
                            name="otherTypes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otherTypes}
                          />
                        </div>
                        <div className="col-4">
                          {" "}
                          <label
                            htmlFor="typeOfVehicle"
                            className="font-extrabold"
                          >
                            Type Of Vehicle
                          </label>
                          <input
                            type="text"
                            name="typeOfVehicle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.typeOfVehicle}
                          />
                        </div>
                      </div>

                      <div
                        className="divider"
                        data-content="Property Owner"
                      ></div>

                      {/* -------------------------Row 7-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-3">
                          <label
                            htmlFor="nameOfOwner"
                            className="font-extrabold"
                          >
                            Name Of Owner
                          </label>
                          <input
                            type="text"
                            name="nameOfOwner"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nameOfOwner}
                          />
                        </div>
                        <div className="col-2">
                          <label
                            htmlFor="identificationNumber"
                            className="font-extrabold"
                          >
                            ID Number
                          </label>
                          <input
                            type="text"
                            name="identificationNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.identificationNumber}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="postalAddress"
                            className="font-extrabold"
                          >
                            Postal Address
                          </label>
                          <input
                            type="text"
                            name="postalAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.postalAddress}
                          />
                        </div>
                        <div className="col-2">
                          <label
                            htmlFor="cellphoneNumber"
                            className="font-extrabold"
                          >
                            Cellphone Number
                          </label>
                          <input
                            type="text"
                            name="cellphoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cellphoneNumber}
                          />
                        </div>
                        <div className="col-2">
                          <label
                            htmlFor="telephoneNumberOfOwner"
                            className="font-extrabold"
                          >
                            Telephone Number
                          </label>
                          <input
                            type="text"
                            name="telephoneNumberOfOwner"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.telephoneNumberOfOwner}
                          />
                        </div>
                      </div>
                      <div className="row u-no-wrap">
                        <div className="col-3">
                          <label
                            htmlFor="residentialAddress.streetName"
                            className="font-extrabold"
                          >
                            Street Name
                          </label>
                          <input
                            type="text"
                            name="residentialAddress.streetName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={streetName}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="residentialAddress.streetNumber"
                            className="font-extrabold"
                          >
                            Street Number
                          </label>
                          <input
                            type="text"
                            name="residentialAddress.streetNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={streetNumber}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="residentialAddress.suburb"
                            className="font-extrabold"
                          >
                            Suburb
                          </label>
                          <input
                            type="text"
                            name="residentialAddress.suburb"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={suburb}
                          />
                        </div>
                        <div className="col-3">
                          <label
                            htmlFor="residentialAddress.erfNumber"
                            className="font-extrabold"
                          >
                            Erf Number
                          </label>
                          <input
                            type="text"
                            name="residentialAddress.erfNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={erfNumber}
                          />
                        </div>
                      </div>

                      <div className="divider" data-content="Fire Report"></div>

                      {/* -------------------------Row 8-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-3">
                          {" "}
                          <label
                            htmlFor="originOfFire"
                            className="font-extrabold"
                          >
                            Origin Of Fire
                          </label>
                          <input
                            type="text"
                            name="originOfFire"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.originOfFire}
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="other" className="font-extrabold">
                            Other
                          </label>
                          <input
                            type="text"
                            name="other"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.other}
                          />
                        </div>
                        <div className="col-3">
                          {" "}
                          <label
                            htmlFor="methodOfExtinguishing"
                            className="font-extrabold"
                          >
                            Method Of Extinguishing
                          </label>
                          <input
                            type="text"
                            name="methodOfExtinguishing"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.methodOfExtinguishing}
                          />
                        </div>
                        <div className="col-3">
                          {" "}
                          <label htmlFor="quantity" className="font-extrabold">
                            Quantity
                          </label>
                          <input
                            type="text"
                            name="quantity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                          />
                        </div>
                      </div>

                      {/* -------------------------Row 9-------------------------------- */}
                      <div className="row u-no-wrap">
                        <div className="col-12">
                          {" "}
                          <label
                            htmlFor="summaryOfIncident"
                            className="font-extrabold"
                          >
                            Summary Of Incident
                          </label>
                          <input
                            type="text"
                            name="summaryOfIncident"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.summaryOfIncident}
                          />
                        </div>
                      </div>

                      <div className="space space--lg ..."></div>

                      <div className="row u-no-wrap">
                        <div className="col-12 u-center">
                          {" "}
                          <button
                            className="btn-dark"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
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

export default FireForm;
