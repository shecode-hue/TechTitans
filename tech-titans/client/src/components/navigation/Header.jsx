import logo from "../../assets/logo_ncrst.jpeg";
import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User.context";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header header-fixed u-unselectable header-animated ">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <Link to={user ? "/home" : "/"}>
            <img
              src={logo}
              alt="fire department logo"
              style={{ height: "4rem" }}
            />
            <p className="mx-2">Science Connect</p>
          </Link>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-right">
          <div className="nav-item">
            <Link to="/reportFire">
              <button className="btn-danger animated pound">Book Latest Events</button>
            </Link>
          </div>
          {user ? (
            <Fragment>
              <div className={`nav-item text-dark`}>
                <Link to="/fireForm" className={` text-black`}>
                  Browse for events
                </Link>
              </div>
              <div className={`nav-item`}>
                <Link to="/fireTable" className={` text-black`}>
                  Add an Event
                </Link>
              </div>
              <div className={`nav-item`}>
                <Link to="/reportTable" className={` text-black`}>
                  Reports Table
                </Link>
              </div>
            </Fragment>
          ) : (
            ""
          )}
          <div className="nav-item">
            <Link to="/about" className={` text-black`}>
              Browse an Event
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/about" className={` text-black`}>
              Add an Event
            </Link>
          </div>
          
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-dropdown-link">
              {user ? "Logout" : "Sign In/Sign Up"}
            </a>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              {user ? (
                ""
              ) : (
                <Fragment>
                  {/*eslint-disable-next-line jsx-a11y/aria-role */}
                  <li role="menu-item">
                    <Link to="/login" className={` text-black`}>
                      Sign In
                    </Link>
                  </li>
                  {/*eslint-disable-next-line jsx-a11y/aria-role */}
                  <li role="menu-item">
                    <Link to="/register" className={` text-black`}>
                      Sign Up
                    </Link>
                  </li>
                </Fragment>
              )}
              {user ? (
                //eslint-disable-next-line jsx-a11y/aria-role
                <li role="menu-item">
                  <Link to="/logout">Logout</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
