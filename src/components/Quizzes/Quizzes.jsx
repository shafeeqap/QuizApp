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
    isRegularQuizzes,
    isCompleted,
    showNext,
    currentQuestionIndex,
    isLoading,
    resetQuiz
  } = useContext(QuizzesContext);
  const { handleOptionSelect, handleSubmit, handleNext, handleReload } =
    useQuizLogic(isRegularQuizzes);


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

        totalQuestions={isRegularQuizzes.length}
        currentQuestionIndex={currentQuestionIndex}
        isCompleted={isCompleted}
        quizzes={isRegularQuizzes}
      />

      {isCompleted ? (
        <QuizCompleted
          totalQuestions={isRegularQuizzes.length}
          handleReload={handleReload}
        />
      ) : (
        <>
          <section className="quiz-info">
            {isRegularQuizzes.length > 0 && isRegularQuizzes[currentQuestionIndex]?.options ? (
              <Question
                key={isRegularQuizzes[currentQuestionIndex]?.id}
                {...isRegularQuizzes[currentQuestionIndex]}
                onSelectOption={handleOptionSelect}
                showCorrectAnswer={showNext}
              />
            ) : (
              <p>Loading quiz...</p>
            )}
          </section>

          <QuizControls
            isLastQuestion={currentQuestionIndex === isRegularQuizzes?.length - 1}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default Quizzes;
