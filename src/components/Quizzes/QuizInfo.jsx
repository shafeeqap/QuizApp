import { Timer } from "../Timer";
import { useContext, useEffect, useState } from "react";
import QuizzesContext from "../../context/quizzesContext";
import PropTypes from "prop-types";

const QuizInfo = ({
  totalQuestions,
  currentQuestionIndex,
  isCompleted,
  quizzes,
}) => {


  return (
    <div className="quiz-title">
      {!isCompleted ? (
        <>
          <h3 className="quiz-question">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </h3>
          {quizzes?.[0]?.isDailyQuiz && <Timer className="quiz-timer" />}
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
  quizzes: PropTypes.array,
};
export default QuizInfo;
