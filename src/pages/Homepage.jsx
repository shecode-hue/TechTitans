import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Calendar } from "antd";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { scienceActivitiesSliders } from "../configs";

const scienceActivities = [
  {
    date: new Date(2023, 9, 8), // October 8, 2023
    type: "warning",
    content: "Hackaton.",
  },
  {
    date: new Date(2023, 9, 8), // October 8, 2023
    type: "success",
    content: "Conference",
  },
  {
    date: new Date(2023, 9, 10), // October 10, 2023
    type: "warning",
    content: "Competition",
  },
  {
    date: new Date(2023, 9, 10), // October 10, 2023
    type: "success",
    content: "Fair",
  },
  {
    date: new Date(2023, 9, 10), // October 10, 2023
    type: "error",
    content: "Conference",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "warning",
    content: "Hackaton",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "success",
    content: "Science Fair",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "error",
    content: "Science fair 2",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "error",
    content: "Competition",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "error",
    content: "Science Fair",
  },
  {
    date: new Date(2023, 9, 15), // October 15, 2023
    type: "error",
    content: "Hackerton",
  },
];

export const Homepage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
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
      <Slider {...sliderSettings}>
        {scienceActivitiesSliders.map((activity, index) => (
          <div className="slide-item" key={index}>
            <img src={activity.image} alt={`Slider ${index + 1}`} />
            <div className="slide-content">
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
              <div className="button-container">
                <div className="pulse-button">
                  <button onClick={() => navigate("/activitys")}>See More </button>
                </div>{" "}
              </div>
            </div>
          </div>
        ))}
      </Slider>

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
          <Calendar dateCellRender={dateCellRender} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
