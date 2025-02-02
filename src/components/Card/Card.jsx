import PropTypes from "prop-types";
import "./Card.css";
import Timer from "../Timer/Timer";
import { useContext, useEffect, useState } from "react";
import QuizzesContext from "../../context/quizzesContext";
import { Watch } from "react-loader-spinner";

const Card = ({ image, title, description, children, isDailyQuiz }) => {
  const { isDailyQuizzes } = useContext(QuizzesContext);
  const [quizStartTime, setQuizStartTime] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (isDailyQuizzes?.length && isDailyQuizzes[0].startTime) {
      const startTimestamp = isDailyQuizzes[0].startTime.seconds * 1000;
      setQuizStartTime(startTimestamp);
    }
  }, [isDailyQuizzes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const waiting = quizStartTime && now < quizStartTime;

  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-title">
          <div className="title-wraper">
            <h3>{title}</h3>
            {isDailyQuiz && waiting ? (
              <Watch height={30} color="white" />
            ) : (
              <>{isDailyQuiz && <Timer />}</>
            )}
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
  onClick: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  isDailyQuiz: PropTypes.array,
};
export default Card;
