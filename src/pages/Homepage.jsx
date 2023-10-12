import { Badge, Calendar } from "antd";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { scienceActivitiesSliders, routesDictionary } from "../configs";
import { CustomSlider, Frame, LazyLoadedImage } from "../components/misc";
import { scienceActivities } from "../mocks";
import { useContext } from "react";
import { UserContext } from "../context";
import { useFetchActivities } from "../hooks";
import { createCalendarActivity } from "../helpers";

const { activities, login, book_activity } = routesDictionary;

export const Homepage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { activities: upcommingActivities } = useFetchActivities();

  const calendarActivities = upcommingActivities.map((activity) =>
    createCalendarActivity(activity)
  );
  // Function to get activity data for a specific date
  const dateCellRender = (value) => {
    if (calendarActivities) {
      const activitysForDate = calendarActivities.filter((activity) => {
        const activityDate = new Date(activity.date); // Replace 'date' with the actual date property in your activity data
        return (
          activityDate.getDate() === value.date() &&
          activityDate.getMonth() === value.month()
        );
      });
      return (
        <div>
          {activitysForDate.map((activity, index) => (
            <div key={index}>
              <Badge status={activity.type} text={activity.content} />
            </div>
          ))}
        </div>
      );
    }

    const activitysForDate = scienceActivities.filter((activity) => {
      const activityDate = new Date(activity.date); // Replace 'date' with the actual date property in your activity data
      return (
        activityDate.getDate() === value.date() &&
        activityDate.getMonth() === value.month()
      );
    });
    return (
      <div>
        {activitysForDate.map((activity, index) => (
          <div key={index}>
            <Badge status={activity.type} text={activity.content} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="slider-container">
      <CustomSlider
        content={scienceActivitiesSliders.map((activity, index) => (
          <div className="slide-item" key={index}>
            <LazyLoadedImage
              imageSrc={activity.image}
              alt={`Slider ${index + 1}`}
            />
            <div className="slide-content">
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
              <div className="button-container">
                <div className="pulse-button">
                  <button onClick={() => navigate(user ? activities : login)}>
                    Browse Activities{" "}
                  </button>
                </div>{" "}
              </div>
            </div>
          </div>
        ))}
      />

      <div className="button-container">
        <button
          className="pulse-button"
          onClick={() => navigate(user ? book_activity : login)}
        >
          Book an activity
        </button>
      </div>

      <Frame
        content={
          <div className="main-calendar-container">
            <div className="calendar-container">
              <Calendar cellRender={dateCellRender} />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Homepage;
