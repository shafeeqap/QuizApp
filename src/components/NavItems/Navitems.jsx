import { Link } from "react-router-dom";

const Navitems = ({item1, item2, item3, item4}) => {
  return (
    <div>
      <nav>
        <div className="nav-container">
          {/* <div className="menu-icon" onClick={toggleDrawer}>
              <IoMenu
                style={{ fontSize: "25px", cursor: "pointer" }}
                aria-label="Toggle menu"
              />
            </div> */}
          <ul className="nav-items">
            <Link to="/dashboard">
              <li>{item1}</li>
            </Link>
            <Link to="/users">
              <li>Users</li>
            </Link>
            <Link to="/quiz">
              <li>Quiz</li>
            </Link>
            <Link to="/score">
              <li>Score</li>
            </Link>
          </ul>
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
          {/* 
          <button className="menu-btn" onClick={toggleMenu}>
            {user.name[0] || "G"}
          </button> */}
        </div>
      </nav>
    </div>
  );
};

export default Navitems;
