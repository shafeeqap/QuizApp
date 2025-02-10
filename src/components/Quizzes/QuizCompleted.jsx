import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { IoShareSocialOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import Confetti from "react-confetti";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";
import UserContext from "../../context/userContext";


const QuizCompleted = ({ totalQuestions, handleReload }) => {
  const { score, timeTaken } = useContext(QuizzesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const handleShare = async()=>{
    try {
      navigate('/social-share')
      console.log('Content shared successfully!');
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }
  
  return (
    <div className="reload-container">
      <div>
        <Confetti
          width={500}
          height={500}
          style={{
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <h4>You completed the quiz!</h4>
      <p>
        Your total score is: {score} / {totalQuestions}
      </p>

      <p>
        You took <span style={{ color: "red" }}>{timeTaken}</span> seconds to
        complete the quiz.
      </p>
      {!user ? (
        <>
          <h4 className="warning-text">
            You need to log in to save your score.
          </h4>
          <Link to="/login">
            <Button variant="secondary" size="small">
              Log in
            </Button>
          </Link>
        </>
      ) : (
        <>
          <div className="quiz-comp-btn-container">
            <Button
              type="button"
              variant="danger"
              size="small"
              onClick={handleReload}
            >
              Try Again
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={handleShare}
            >
              <IoShareSocialOutline size={20} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

QuizCompleted.propTypes = {
  score: PropTypes.number,
  totalQuestions: PropTypes.number,
  timeTaken: PropTypes.number,
  user: PropTypes.object,
  handleReload: PropTypes?.func,
};
export default QuizCompleted;
