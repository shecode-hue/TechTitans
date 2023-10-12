import { Badge, Calendar } from "antd";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { scienceActivitiesSliders, routesDictionary } from "../configs";
import { CustomSlider, LazyLoadedImage } from "../components/misc";
import { scienceActivities } from "../mocks";

const { activities } = routesDictionary;

export const Homepage = () => {
  const navigate = useNavigate();

  // Function to get activity data for a specific date
  const dateCellRender = (value) => {
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
                  <button onClick={() => navigate(activities)}>
                    See More{" "}
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
          onClick={() => navigate("/book-activity")}
        >
          Book an activity
        </button>
      </div>

      <div className="main-calendar-container">
        <div className="calendar-container">
          <Calendar cellRender={dateCellRender} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
