import { Timer } from "../Timer";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";
import PropTypes from "prop-types";

const QuizInfo = ({ totalQuestions, currentQuestionIndex, isCompleted, countDownTimer }) => {
  // const { quizzes, currentQuestionIndex, isCompleted } =
  //   useContext(QuizzesContext);



  return (
    <div className="quiz-title">
      {!isCompleted ? (
        <>
          <h3 className="quiz-question">
            Question {currentQuestionIndex + 1} / {totalQuestions}
            {/* Set Timer starting and ending time */}
          </h3>
          <Timer className="quiz-timer" countDownTimer={countDownTimer} />
        </>
      ) : (
        <h3>Congratulations!🎉</h3>
      )}
    </div>
  );
};

QuizInfo.propTypes = {
  totalQuestions: PropTypes.number,
  currentQuestionIndex: PropTypes.number,
  isCompleted: PropTypes.bool,
  countDownTimer: PropTypes.number,
};
export default QuizInfo;
