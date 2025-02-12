import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoShareSocialOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import QuizzesContext from "../../context/quizzesContext";
import UserContext from "../../context/userContext";
import Modal from "../Modal/Modal";
import SocialShare from "../../pages/SocialShare/SocialShare";

const QuizCompleted = ({ totalQuestions, handleReload, isDailyQuizzes }) => {
  const { score, timeTaken } = useContext(QuizzesContext);
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="reload-container">
      {/* <div>
        <Confetti
          width={500}
          height={500}
          style={{
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div> */}
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
            {!isDailyQuizzes && (
              <Button
                type="button"
                variant="danger"
                size="small"
                onClick={handleReload}
              >
                Try Again
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={handleShareModalOpen}
            >
              <IoShareSocialOutline size={20} />
            </Button>
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SocialShare />
      </Modal>
    </div>
  );
};

QuizCompleted.propTypes = {
  score: PropTypes.number,
  totalQuestions: PropTypes.number,
  timeTaken: PropTypes.number,
  user: PropTypes.object,
  handleReload: PropTypes?.func,
  isDailyQuizzes: PropTypes.array,
};
export default QuizCompleted;
