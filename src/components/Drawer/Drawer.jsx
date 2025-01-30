import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdQuiz,
  MdScore,
} from "react-icons/md";
import "./Drawer.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { CgProfile } from "react-icons/cg";

const Drawer = ({ isOpen, onClose }) => {
  const { user, quizzes, isLoading, setIsLoading } = useContext(UserContext);
  return (
    <>
      {/* Backdrop to detect clicks outside the drawer */}
      {isOpen && <div className="backdrop" onClick={onClose}></div>}

      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div onClick={onClose} className="close-btn">
          &times;
        </div>

        <div className="drawer-content">
          <Link to="/">
            <div className="drawer-items">
              <MdDashboard style={{ color: "white" }} />
              Home
            </div>
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/dashboard">
                <div className="drawer-items">
                  <MdDashboard style={{ color: "white" }} />
                  Dashboard
                </div>
              </Link>

              <Link to="/users">
                <div className="drawer-items">
                  <MdSupervisedUserCircle style={{ color: "white" }} />
                  Users
                </div>
              </Link>
              <Link to="/show-quizzes">
                <div className="drawer-items">
                  <MdDashboard style={{ color: "white" }} />
                  Quizzes
                </div>
              </Link>
            </>
          )}

          {user?.role !== "admin" && (
            <>
              <Link to="/quiz">
                <div className="drawer-items">
                  <MdQuiz style={{ color: "white" }} />
                  Quizzess
                </div>
              </Link>

              <Link to="/score">
                <div className="drawer-items">
                  <MdScore style={{ color: "white" }} />
                  Score
                </div>
              </Link>

              <Link to="/profile">
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
