import PropTypes from "prop-types";
import "./Card.css";
import Timer from "../Timer/Timer";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";

const Card = ({ image, title, description, children }) => {
  const { isDailyQuiz } = useContext(QuizzesContext);
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-title">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{title}</h3>
            {isDailyQuiz > 0 && <Timer />}
          </div>
          <p>{description}</p>
        </div>
        <div className="image-wraper">
          <img src={image} alt="card-image" />
        </div>
        <div className="card-btn-container">{children}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};
export default Card;
