import React from "react";
import Slider from "react-slick";
import Slider1 from "../../assets/img_1.jpeg"
import Slider2 from "../../assets/img_2.jpeg"
import Slider3 from "../../assets/img_3.jpeg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Calendar } from "antd";
import "./homepage.css";

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

  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        <div className="slide-item">
          <img src={Slider1} alt="Slider Image 1" />
          <div className="slide-content">
            <h2>Slide 1</h2>
            <p>Some text for slide 1</p>
          </div>
        </div>
        <div className="slide-item">
          <img src={Slider2} alt="Slider Image 2" />
          <div className="slide-content">
            <h2>Slide 2</h2>
            <p>Some text for slide 2</p>
          </div>
        </div>
        <div className="slide-item">
          <img src={Slider3} alt="Slider Image 3" />
          <div className="slide-content">
            <h2>Slide 3</h2>
            <p>Some text for slide 3</p>
          </div>
        </div>
      </Slider>

      <div className="button-container">
  <button className="pulse-button">
    Book an event
  </button>
</div>
<div className="main-calender-container">
<div className="calendar-container">
        <Calendar />
</div>
</div>

    </div>
  );
};

export default Homepage;
