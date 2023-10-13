import logo from "../../assets/logo.png";
import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { USER_TYPES, routesDictionary } from "../../configs";
import { useIsMobile } from "../../hooks";
import { Avatar } from "antd";
import DropDownLinks from "./DropDownLinks";
import MobileHeader from "./MobileHeader";

const { home, create_activity, activities, login } = routesDictionary;

const Header = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useIsMobile();
  
  return isMobile ? (
    <MobileHeader />
  ) : (
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
      <div className="header-nav" id="header-menu">
        <div className="nav-right">
          <div className="nav-item">
            <Link to={user ? activities : login}>
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

          <DropDownLinks />
        </div>
      </div>
    </div>
  );
};

export default Header;
