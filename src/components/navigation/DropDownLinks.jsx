/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/aria-role */
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { routesDictionary } from "../../configs";
import { useLogout } from "../../hooks";

const { login, register } = routesDictionary;

const DropDownLinks = () => {
  const { user } = useContext(UserContext);
  const { logout: logUserOut } = useLogout();
  return (
    <div className="nav-item has-sub toggle-hover" id="dropdown">
      {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="nav-dropdown-link">{user ? "Logout" : "Login/Register"}</a>
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
  );
};

export default DropDownLinks;
