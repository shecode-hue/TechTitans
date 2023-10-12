import logo from "../../assets/logo.png";
import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { USER_TYPES, routesDictionary } from "../../configs";
import { useLogout } from "../../hooks";
import { Avatar } from "antd";

const { home, book_activity, create_activity, activities, login, register } =
  routesDictionary;

const Header = () => {
  const { user } = useContext(UserContext);
  const { logout: logUserOut } = useLogout();

  console.log("header user", user);
  return (
    <div className="header header-fixed u-unselectable header-animated ">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <Link to={home}>
            <img src={logo} alt="sci-connect logo" style={{ height: "4rem" }} />
            <p className="mx-2 my-2" style={{ fontFamily: "monospace" }}>
              SCI_CONNECT
            </p>
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
            <Link to={user ? book_activity : login}>
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
              {user.userType === USER_TYPES.ORGANIZER && (
                <div className={`nav-item`}>
                  <Link to={create_activity} className={` text-black`}>
                    Create Activity
                  </Link>
                </div>
              )}
              <div className={`nav-item`}>
                <Avatar
                  style={{
                    backgroundColor: "darkslategray",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={2}
                >
                  {user.name}
                </Avatar>
              </div>
            </Fragment>
          ) : (
            ""
          )}

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
                <li role="menu-item" onClick={() => logUserOut()}>
                  <Link to="#">Logout</Link>
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
