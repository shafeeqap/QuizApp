import { useContext, useEffect } from "react";
import Question from "../Question/Question";
import Loading from "../Loading/Loading";
import "./Quizzes.css";
import QuizInfo from "./QuizInfo";
import QuizCompleted from "./QuizCompleted";
import QuizControls from "./QuizControls";
import useQuizLogic from "./Quizzes.hooks";
import QuizzesContext from "../../context/quizzesContext";

const Quizzes = () => {
  const {
    quizzes,
    isCompleted,
    showNext,
    currentQuestionIndex,
    isLoading,
  } = useContext(QuizzesContext);
  const { handleOptionSelect, handleSubmit, handleNext, handleReload } =
    useQuizLogic(quizzes);


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
        totalQuestions={quizzes.length}
        currentQuestionIndex={currentQuestionIndex}
        isCompleted={isCompleted}
      />

      {isCompleted ? (
        <QuizCompleted
          totalQuestions={quizzes.length}
          handleReload={handleReload}
        />
      ) : (
        <>
          <section className="quiz-info">
            {quizzes.length > 0 && quizzes[currentQuestionIndex]?.options ? (
              <Question
                key={quizzes[currentQuestionIndex]?.id}
                {...quizzes[currentQuestionIndex]}
                onSelectOption={handleOptionSelect}
                showCorrectAnswer={showNext}
              />
            ) : (
              <p>Loading quiz...</p>
            )}
          </section>

          <QuizControls
            isLastQuestion={currentQuestionIndex === quizzes?.length - 1}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default Quizzes;
