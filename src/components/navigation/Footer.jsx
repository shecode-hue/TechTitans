import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer" style={{ padding: "2rem 0" }}>
        <div className="u-center">
          <img
            src={logo}
            alt="science connect logo"
            style={{ height: "7rem" }}
          />
        </div>
        <div className="content">
          <div className="divider"></div>

          
        </div>
        <p className="subtitle">@Tech Titans 2023</p>
      </footer>
    </div>
  );
};

export default Footer;
