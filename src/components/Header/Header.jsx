import "../../assets/styles/header.css";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import Drawer from "../Drawer/Drawer";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import UserContext from "../../context/userContext";
import SearchContext from "../../context/searchContext";
import Button from "../Button/Button"

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useContext(UserContext);
  const { searchTerm, handleInputChange } = useContext(SearchContext);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsToggleMenuOpen((prev) => !prev);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsToggleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="nav-container">
            <div className="menu-icon" onClick={toggleDrawer}>
              <IoMenu
                style={{ fontSize: "25px", cursor: "pointer" }}
                aria-label="Toggle menu"
              />
            </div>
            <ul className="nav-items">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <li>Home</li>
              </NavLink>
              {user?.role === "admin" && (
                <>
                  <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <li>MyApp</li>
                  </NavLink>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <li>Users</li>
                  </NavLink>
                  <NavLink
                    to="/show-quizzes"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <li>Quizzes</li>
                  </NavLink>
                  <NavLink
                    to="/score"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <li>Score</li>
                  </NavLink>
                </>
              )}

              {user?.role !== "admin" && (
                <>
                  <li>
                    <NavLink
                      to="score"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Score
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="profile"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {user?.role === "admin" && (
              <div className="search">
                <input
                  type="text"
                  placeholder="Search by name, email, or score"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {user?.name ? (
              <div className="menu-btn" onClick={toggleMenu}>
                {user.name[0] || "G"}
              </div>
            ) : (
              <div >
                <div>
                  <Button onClick={()=>navigate('/login')}>Login</Button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div ref={menuRef}>
        <ToggleMenu isOpen={isToggleMenuOpen} />
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Header;
