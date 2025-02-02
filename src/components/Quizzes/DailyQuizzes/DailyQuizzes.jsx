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
    isDailyQuizzes,
    isCompleted,
    showNext,
    currentQuestionIndex,
    isLoading,
    resetQuiz,
  } = useContext(QuizzesContext);
  const { handleOptionSelect, handleSubmit, handleNext, handleReload } =
    useQuizLogic(isDailyQuizzes);


    useEffect(() => {
      handleReload();
      resetQuiz()
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
        totalQuestions={isDailyQuizzes.length}
        currentQuestionIndex={currentQuestionIndex}
        isCompleted={isCompleted}
        quizzes={isDailyQuizzes}
      />

      {isCompleted ? (
        <QuizCompleted
          totalQuestions={isDailyQuizzes.length}
          handleReload={handleReload}
        />
      ) : (
        <>
          <section className="quiz-info">
            {isDailyQuizzes.length > 0 &&
            isDailyQuizzes[currentQuestionIndex]?.options ? (
              <Question
                key={isDailyQuizzes[currentQuestionIndex]?.id}
                {...isDailyQuizzes[currentQuestionIndex]}
                onSelectOption={handleOptionSelect}
                showCorrectAnswer={showNext}
              />
            ) : (
              <p>Loading quiz...</p>
            )}
          </section>

          <QuizControls
            isLastQuestion={currentQuestionIndex === isDailyQuizzes?.length - 1}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default DailyQuizzes;
