import { useContext, useEffect } from "react";
import Question from "../../Question/Question";
import "../Quizzes.css";
import Loading from "../../Loading/Loading";
import QuizInfo from "../QuizInfo";
import QuizzesContext from "../../../context/quizzesContext";
import useQuizLogic from "../Quizzes.hooks";
import QuizCompleted from "../QuizCompleted";
import QuizControls from "../QuizControls";

const DailyQuizzes = () => {
  const {
    isDailyQuiz,
    isCompleted,
    showNext,
    currentQuestionIndex,
    isLoading,
    quizEndTime,
  } = useContext(QuizzesContext);
  const { handleOptionSelect, handleSubmit, handleNext, handleReload } =
    useQuizLogic(isDailyQuiz);

// console.log(quizEndTime, 'quizEndTime.......................');

    useEffect(() => {
      handleReload();
    }, []);
  

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading height={"80px"} width={"80px"} color={"#fff"} />
      </div>
    );
  }

  return (
    <div className="quizzes-container">
      <QuizInfo
        totalQuestions={isDailyQuiz.length}
        currentQuestionIndex={currentQuestionIndex}
        isCompleted={isCompleted}
        countDownTimer={quizEndTime}
      />

      {isCompleted ? (
        <QuizCompleted
          totalQuestions={isDailyQuiz.length}
          handleReload={handleReload}
        />
      ) : (
        <>
          <section className="quiz-info">
            {isDailyQuiz.length > 0 &&
            isDailyQuiz[currentQuestionIndex]?.options ? (
              <Question
                key={isDailyQuiz[currentQuestionIndex]?.id}
                {...isDailyQuiz[currentQuestionIndex]}
                onSelectOption={handleOptionSelect}
                showCorrectAnswer={showNext}
              />
            ) : (
              <p>Loading quiz...</p>
            )}
          </section>

          <QuizControls
            isLastQuestion={currentQuestionIndex === isDailyQuiz?.length - 1}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default DailyQuizzes;
