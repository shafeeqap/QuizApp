import { MdDashboard, MdSupervisedUserCircle, MdScore } from "react-icons/md";
import "./Drawer.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { CgProfile } from "react-icons/cg";

const Drawer = ({ isOpen, onClose }) => {
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  return (
    <>
      {/* Backdrop to detect clicks outside the drawer */}
      {isOpen && <div className="backdrop" onClick={onClose}></div>}

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div onClick={onClose} className="close-btn">
          &times;
        </div>

        <div className="drawer-content">
          <Link to="/" onClick={onClose}>
            <div className="drawer-items">
              <MdDashboard style={{ color: "white" }} />
              Home
            </div>
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/dashboard" onClick={onClose}>
                <div className="drawer-items">
                  <MdDashboard style={{ color: "white" }} />
                  Dashboard
                </div>
              </Link>

              <Link to="/users" onClick={onClose}>
                <div className="drawer-items">
                  <MdSupervisedUserCircle style={{ color: "white" }} />
                  Users
                </div>
              </Link>
              <Link to="/score" onClick={onClose}>
                <div className="drawer-items">
                  <MdScore style={{ color: "white" }} />
                  Score
                </div>
              </Link>
              <Link to="/show-quizzes" onClick={onClose}>
                <div className="drawer-items">
                  <MdDashboard style={{ color: "white" }} />
                  Quizzes
                </div>
              </Link>
            </>
          )}

          {user?.role !== "admin" && (
            <>
              <Link to="/profile" onClick={onClose}>
                <div className="drawer-items">
                  <CgProfile style={{ color: "white" }} />
                  Profile
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Drawer;
