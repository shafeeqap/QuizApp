import "./ToggleMenu.css";
import {
  MdOutlineLogout,
  MdOutlineLogin,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import PropTypes from "prop-types";

const ToggleMenu = ({ isOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      await logout();
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Failed to log out. Please try again.");
      console.error(error);
    }
  };

  return (
    isOpen && (
      <div className="toggle">
        <ul>
          {user?.role === "admin" ? (
            <li className="profile">
              <MdOutlineAdminPanelSettings /> {user?.role}
            </li>
          ) : (
            <li className="profile">
              <CgProfile /> {user?.name || "Gust"}
            </li>
          )}
          <li>
            <CiSettings />
            Settings
          </li>
          {user ? (
            <li onClick={logoutHandler}>
              <MdOutlineLogout /> Log out
            </li>
          ) : (
            <Link to="/login">
              <li>
                <MdOutlineLogin /> Log in
              </li>
            </Link>
          )}
        </ul>
      </div>
    )
  );
};

ToggleMenu.propTypes = {
  isOpen: PropTypes.bool,
};

export default ToggleMenu;
