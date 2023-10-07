import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from "../../assets/img_1.jpeg";
import Slider2 from "../../assets/img_2.jpeg";
import Slider3 from "../../assets/img_3.jpeg";
import { Badge, Calendar } from "antd";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const scienceEventsslider = [
  {
    image: Slider1,
    title: "Physics Symposium",
    description:
      "Join us for a symposium on the latest developments in physics research.",
  },
  {
    image: Slider2,
    title: "Chemistry Conference",
    description: "Explore the world of chemistry at our annual conference.",
  },
  {
    image: Slider3,
    title: "Biology Workshop",
    description: "Participate in hands-on biology experiments and workshops.",
  },
  {
    image: Slider1,
    title: "Astronomy Lecture",
    description:
      "Discover the wonders of the universe with our astronomy lecture series.",
  },
  {
    image: Slider2,
    title: "Environmental Science Seminar",
    description:
      "Learn about environmental conservation and sustainability at our seminar.",
  },
  {
    image: Slider3,
    title: "Science Fair",
    description:
      "Showcase your science projects and innovations at our annual science fair.",
  },
];
const scienceEvents = [
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

const Homepage = () => {
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

  // Function to get event data for a specific date
  const dateCellRender = (value) => {
    const eventsForDate = scienceEvents.filter((event) => {
      const eventDate = new Date(event.date); // Replace 'date' with the actual date property in your event data
      return (
        eventDate.getDate() === value.date() &&
        eventDate.getMonth() === value.month()
      );
    });

    return (
      <div>
        {eventsForDate.map((event, index) => (
          <div key={index}>
            <Badge status={event.type} text={event.content} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {scienceEventsslider.map((event, index) => (
          <div className="slide-item" key={index}>
            <img src={event.image} alt={`Slider Image ${index + 1}`} />
            <div className="slide-content">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="button-container">
                <div className="pulse-button">
                  <button onClick={() => navigate("/events")}>See More </button>
                </div>{" "}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="button-container">
        <button
          className="pulse-button"
          onClick={() => navigate("/book-event")}
        >
          Book an event
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
