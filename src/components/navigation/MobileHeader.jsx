/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "../../assets/logo.png";
import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { routesDictionary } from "../../configs";
import { useLogout } from "../../hooks";

const { home, create_activity, activities, register,login } = routesDictionary;

export const MobileHeader = () => {
    const { user } = useContext(UserContext);
    const { logout: logUserOut } = useLogout();

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
      </div>
      <div className="nav-item has-sub toggle-hover" style={{marginBottom: '1rem'}}>
        <a className="nav-dropdown-link" style={{paddingBottom: '1rem'}}></a>
        <ul className="dropdown-menu dropdown-animated" role="menu">
            {user ? (
               <Fragment>
               <li role="menu-item">
                 <Link to={create_activity} className={` text-black`}>
                   Create Activity
                 </Link>
               </li>
               <li role="menu-item">
                 <Link to={activities} className={` text-black`}>
                   Browse Activities
                 </Link>
               </li>
               <li role="menu-item" onClick={() => logUserOut()}>
                 <Link to={"#"} className={` text-black`} >
                   Logout
                 </Link>
               </li>
             </Fragment>
            ) : (
              <Fragment>
                <li role="menu-item">
                  <Link to={login} className={` text-black`}>
                    Login
                  </Link>
                </li>
                <li role="menu-item">
                  <Link to={register} className={` text-black`}>
                    Register
                  </Link>
                </li>
              </Fragment>
            )}
         
        </ul>
      </div>
    </div>
  );
};

export default MobileHeader;
