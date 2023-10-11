import logo from "../../assets/logo_ncrst.jpeg";
import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { routesDictionary } from "../../configs";

const { home, book_activity, create_activity, activities, login, register, logout } =
  routesDictionary;

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="header header-fixed u-unselectable header-animated ">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <Link to={home}>
            <img
              src={logo}
              alt="fire department logo"
              style={{ height: "4rem" }}
            />
            <p className="mx-2 my-2">SCI_CONNECT</p>
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
            <Link to={book_activity}>
              <button className="btn-danger animated pound">
                Book Latest Activities
              </button>
            </Link>
          </div>
          {user ? (
            <Fragment>
              <div className={`nav-item text-dark`}>
                <Link to={activities} className={` text-black`}>
                  Browse for Activities
                </Link>
              </div>
              <div className={`nav-item`}>
                <Link to={create_activity} className={` text-black`}>
                  Add an Activity
                </Link>
              </div>
            </Fragment>
          ) : (
            ""
          )}
          <div className="nav-item">
            <Link to={activities} className={` text-black`}>
              Browse an Activity
            </Link>
          </div>
          <div className="nav-item">
            <Link to={create_activity} className={` text-black`}>
              Add an activity
            </Link>
          </div>

          <div className="nav-item has-sub toggle-hover" id="dropdown">
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-dropdown-link">
              {user ? "Logout" : "Login/Register"}
            </a>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              {user ? (
                ""
              ) : (
                <Fragment>
                  {/*eslint-disable-next-line jsx-a11y/aria-role */}
                  <li role="menu-item">
                    <Link to={login} className={` text-black`}>
                      Login
                    </Link>
                  </li>
                  {/*eslint-disable-next-line jsx-a11y/aria-role */}
                  <li role="menu-item">
                    <Link to={register} className={` text-black`}>
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}
              {user ? (
                //eslint-disable-next-line jsx-a11y/aria-role
                <li role="menu-item">
                  <Link to={logout}>Logout</Link>
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
