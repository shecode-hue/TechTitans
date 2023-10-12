import { useNavigate } from "react-router-dom";
import image1 from "../assets/img_1.jpeg";
import { NoDATA } from "../components/misc";
import routesDictionary from "../configs/routes-dictionary";
import { useFetchActivities } from "../hooks";
import { LoadingPage } from "../helpers/";

const { book_activity } = routesDictionary;

export const ActivitiesPage = () => {
  const { activities, error, loadingActivities } = useFetchActivities();
  const navigate = useNavigate();

  if (error) {
    return <NoDATA title="Server Offline" />;
  }

  return loadingActivities ? (
    <LoadingPage height="54vh" />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Activities</h3>
      <div
        className="container d-flex"
        style={{
          minHeight: "53.6vh",
          width: "100%", 
          flexWrap: "wrap", 
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {activities &&
          activities.map((activity, index) => {
            return (
              <div
                key={index}
                className="card"
                style={{ width: "350px" }}
                onClick={() => navigate(book_activity, { state: { activity } })}
              >
                <div className="card__container" style={{ display: "flex" }}>
                  <div
                    className="card__image"
                    style={{
                      backgroundImage: `url(${image1})`,
                    }}
                  ></div>
                  <div className="card__title-container">
                    <p className="title">{activity.nameOfActivity}</p>
                    <span className="subtitle">
                      {activity.locationOfActivity}
                    </span>
                  </div>
                </div>
                <div className="card__footer">
                  <div className="u-text-center">
                    <span>{`Venue: ${activity.venueOfActivity}`}</span>
                    <br />
                    <span>{`Time: ${activity.timeOfActivity} `}</span>
                    <br />
                    <span>{`Date: ${activity.dateOfActivity}`}</span>
                    <br />
                    <span>{`Contact Number: ${activity.personOfferingActivity.contactNumber}`}</span>
                    <br />
                    <span>{activity.descriptionOfActivity}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ActivitiesPage;
