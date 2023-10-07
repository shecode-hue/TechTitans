import React, { useState, useEffect, Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { Col, Row } from "antd";
import axios from "axios";
import { Select } from "antd";
import { openNotification } from "../../helpers/components/toastNotification";
import { useNavigate } from "react-router-dom";
import Loader from "../misc/Loader";

const { Option } = Select;

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const selectOptions = ["active", "don't know", "extinguished"];

const ReportFire = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${
          NODE_ENV === "production"
            ? REACT_APP_API_URL_PROD
            : REACT_APP_API_URL_DEV
        }/reports`
      );
      setReports(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      openNotification("Error", "Failed to fetch reports");
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  // function to format mongodb timestamp
  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds =
      newDate.getSeconds() < 10
        ? `0${newDate.getSeconds()}`
        : newDate.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  function NotifySuccess(message) {
    openNotification("Success", message);
  }
  function NotifyFailure() {
    openNotification("Error", "An error has occured, please try again");
  }

  return !loading ? (
    <Fragment>
      <button
        className="bg-dark text-light"
        onClick={() => {
          // go back
          navigate(-1);
        }}
      >
        Back
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col
          className="reports-container"
          span={6}
          style={{ height: "70vh", overflowX: "hidden", overflowY: "auto" }}
        >
          {reports &&
            reports.map((report) => {
              return (
                <div className="m-2 bg-white frame p-1">
                  <p>{`Name: ${report.firstname}`}</p>
                  <p>{`Location: ${report.location}`}</p>
                  <p>{`Fire Status: ${report.fireStatus}`}</p>
                  <p>{`Time reported: ${formatDate(report.createdAt)}`}</p>
                </div>
              );
            })}
        </Col>
        <Row className="u-flex" style={{ width: "50%" }}>
          <Col span={20}>
            {/* form to report a fire */}
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                location: "",
                phonenumber: "",
                fireStatus: ""
              }}
              validate={(values) => {}}
              onSubmit={(values, { setSubmitting }) => {
                axios
                  .post(
                    `${
                      NODE_ENV === "production"
                        ? REACT_APP_API_URL_PROD
                        : REACT_APP_API_URL_DEV
                    }/reportFire`,
                    values
                  )
                  .then((res) => {
                    // clear all fields
                    values.firstname = "";
                    values.lastname = "";
                    values.location = "";
                    values.phonenumber = "";
                    values.fireStatus = "";
                    NotifySuccess(res.data);
                    setSubmitting(false);
                    fetchReports();
                  })
                  .catch((err) => {
                    NotifyFailure();
                    console.log(err);
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                handleChange,
                isSubmitting
                /* and other goodies */
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
                      <h2 className="text-center">Report A Fire</h2>
                      <label htmlFor="firstname">Firstname</label>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="John"
                        value={values.firstname}
                        required
                      />
                      <label htmlFor="lastname">Lastname</label>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="Doe"
                        value={values.lastname}
                        required
                      />

                      <label htmlFor="location">Location of fire</label>
                      <Field
                        id="location"
                        name="location"
                        placeholder="Pioneers Park, Best street"
                        value={values.location}
                        required
                      />

                      <label htmlFor="phonenumber">Phone Number</label>
                      <Field
                        id="phonenumber"
                        name="phonenumber"
                        placeholder="08123456789"
                        value={values.phonenumber}
                        required
                      />
                      <label htmlFor="active">Is the fire still burning?</label>
                      <Select
                        name="active"
                        style={{ width: "100%" }}
                        onChange={(value) => (values.fireStatus = value)}
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
          </Col>
        </Row>
      </div>
    </Fragment>
  ) : (
    <Loader percent={90} />
  );
};

export default ReportFire;
