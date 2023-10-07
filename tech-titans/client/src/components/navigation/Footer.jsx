import React from "react";
import logo from "../../assets/fireDepartmentLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer" style={{ padding: "2rem 0" }}>
        <div className="u-center">
          <img
            src={logo}
            alt="fire department logo"
            style={{ height: "7rem" }}
          />
        </div>
        <div className="content">
          <div className="divider"></div>

          <div className="row">
            <div className="col-12">
              <ul className="no-bullets">
                <Link to="/">
                  <li className="footer__list-item">Home</li>
                </Link>
                <Link to="/register">
                  <li className="footer__list-item">Sign Up</li>
                </Link>
                <Link to="/about">
                  <li className="footer__list-item">About Us</li>
                </Link>
                <ul></ul>
              </ul>
            </div>
          </div>
        </div>
        <p className="subtitle">Denilson Uariua © 2022.</p>
      </footer>
    </div>
  );
};

export default Footer;
