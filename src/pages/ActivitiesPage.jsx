import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/img_1.jpeg";
import { NoDATA } from "../components/misc";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

export const ActivitiesPage = () => {
  const [activities, setActivities] = useState();
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //function to fetch fires from the database
    function fetchData() {
      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/api/activities`
        )
        .then(function (response) {
          const { data } = response;
          setActivities(data.activities);
          setLoadingActivities(true);
        })
        .catch(function (error) {
          setError(error);
          console.log("Error: ", error);
        });
    }
    fetchData();
  }, []);

  if (error) {
    return <NoDATA title="Server Offline"/>;
  }

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
      {activities &&
        activities.map((activity) => {
          return (
            <div
              className="card"
              style={{ width: "350px" }}
              onClick={() => navigate()}
            >
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
                  <p className="title">{activity.title}</p>
                  <span className="subtitle">{activity.location}</span>
                </div>
              </div>
              <div className="content u-center">
                <div
                  className={`${
                    loadingActivities ? "none" : "animated loading hide-text"
                  }`}
                ></div>
              </div>

              <div className="card__footer">
                <div className="u-text-center">
                  <span>{activity.description}</span>
                  <br />
                  <span>{`Date: ${activity.activityDate}`}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ActivitiesPage;
