import React from "react";
// import logo
import logo from "../../assets/fireDepartmentLogo.png";
import img1 from "../../assets/image.jpg";
import img2 from "../../assets/image1.jpg";
import img3 from "../../assets/image2.jpg";
import img4 from "../../assets/image3.jpg";
import { Carousel } from "antd";
import { Row, Col } from "antd";

const PrimaryHomepage = () => {
  const contentStyle = {
    height: "360px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%"
  };
  const imageStyle = {
    height: "360px",
    width: "100%",
    objectFit: "cover"
  };
  return (
    // create a landing page
    <>
      <div className="hero bg-yellow-200 p-3">
        <Row className="my-2" style={{ width: "100%" }}>
          <Col xs={24} sm={6} lg={12}>
            {" "}
            {/* add an image */}
            <img
              src={logo}
              alt="fire department logo"
              style={{ height: "14rem" }}
            />
          </Col>
          <Col xs={24} sm={18} lg={12}>
            {" "}
            <h1 className="title uppercase">Namibian Fire Monitoring and Recording System</h1>
            <h3 className="subtitle text-gray-600">
              Created for Fire Brigades
            </h3>
          </Col>
        </Row>{" "}
      </div>
      <div className="p-2"></div>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            {" "}
            <p>Namibian fire fighter</p>
            <img src={img1} alt="" style={imageStyle} />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <p>A wild fire in Windhoek</p>
            <img src={img2} alt="" style={imageStyle} />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <p>Windhoek fire brigade employees</p>
            <img src={img3} alt="" style={imageStyle} />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <p>A wild fire in Windhoek</p>
            <img src={img4} alt="" style={imageStyle} />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default PrimaryHomepage;
