import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/img_1.jpeg";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const EventsPage = () => {
  const [events, setEvents] = useState();
  const [reports, setReports] = useState();
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  console.log("events", events);
  useEffect(() => {
    //function to fetch fires from the database
    function fetchData() {
      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/api/events`
        )
        .then(function (response) {
          const { data } = response;
          setEvents(data.events);
          setLoadingEvents(true);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/reports`
        )
        .then((response) => {
          const { data } = response;
          setReports(data);
          setLoadingReports(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  let navigate = useNavigate();

  return (
    <div
      className="container d-flex"
      style={{
        width: "fit-content",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {events &&
        events.map((event) => {
          return (
            <div className="card" style={{ width: "350px" }}>
              <div
                className="card__container"
                style={{ display: "flex", flexDirection: " row" }}
              >
                <div
                  className="card__image"
                  style={{
                    backgroundImage: `url(${image1})`,
                  }}
                ></div>
                <div className="card__title-container">
                  <p className="title">{event.title}</p>
                  <span className="subtitle">{event.location}</span>
                </div>
              </div>
              <div className="content u-center">
                <div
                  className={`${
                    loadingEvents ? "none" : "animated loading hide-text"
                  }`}
                >
                </div>
              </div>

              <div className="card__footer">
                <div className="u-text-center">
                  <span>
                  {event.description}
                  </span>
                  <br />
                  <span>
                  {`Date: ${event.eventDate}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default EventsPage;
