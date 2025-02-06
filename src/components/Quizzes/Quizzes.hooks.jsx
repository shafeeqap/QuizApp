import { useContext, useEffect } from "react";
import UserContext from "../../context/userContext";
import QuizzesContext from "../../context/quizzesContext";

const useQuizLogic = (quizzes) => {
  const { user } = useContext(UserContext);
  console.log(quizzes, "Quizzes");

  const {
    score,
    setScore,
    resetQuiz,
    setIsCompleted,
    quizDetails,
    questionId,
    setTimeTaken,
    answeredQuestions,
    setQuizStartTime,
    setAnsweredQuestions,
    setQuestionId,
    setShowSubmit,
    setShowNext,
    setQuizDetails,
    finalizeQuiz,
    updateQuizState,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useContext(QuizzesContext);

  // Initialize answered questions
  useEffect(() => {
    setAnsweredQuestions(quizzes.map((q) => ({ ...q, selectedOption: null })));
  }, [quizzes]);

  // Handle option selection
  const handleOptionSelect = (questionId, selectedOption) => {
    setQuestionId(questionId);

    setAnsweredQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedOption } : q
      )
    );
    setShowSubmit(true);
    setShowNext(false);
  };

  const processCurrentQuestion = () => {
    const selectedOption =
      answeredQuestions[currentQuestionIndex]?.selectedOption;
    const correctAnswer = quizzes[currentQuestionIndex]?.answer;

    const isCorrect = selectedOption === correctAnswer;
    const quizType = quizzes.some((quiz) => quiz.isDailyQuiz === true) ? "DailyQuiz" : "RegularQuiz";

    const updatedQuizDetails = [
      ...(quizDetails || []),
      {
        id: questionId,
        question: quizzes[currentQuestionIndex]?.question,
        selectedValue: selectedOption,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
      },
    ];

    const updatedScore = isCorrect ? score + 1 : score;
    const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

    return { updatedQuizDetails, updatedScore, isLastQuestion, quizType };
  };

  // Handle quiz submission
  const handleSubmit = () => {
    if (quizzes[0].isDailyQuiz == true) {
      const { endTime } = quizzes[0];

      const currentTime = new Date();

      if (currentTime > endTime.seconds * 1000) {
        alert("You cannot submit. The quiz time is over!");
        return;
      }
    }

    const { updatedQuizDetails, updatedScore, isLastQuestion, quizType } =
      processCurrentQuestion();
    console.log(updatedQuizDetails, "Quiz Details");

    if (isLastQuestion) {
      finalizeQuiz(user.uid, updatedScore, updatedQuizDetails, quizType);
    } else {
      updateQuizState(updatedScore, updatedQuizDetails);
    }

    setShowSubmit(false);
    setShowNext(true);
  };

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowSubmit(false);
      setShowNext(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Handle quiz reload
  const handleReload = async () => {
    await resetQuiz();
    setIsCompleted(false);
    setShowNext(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeTaken(null);
    setQuizStartTime(new Date().getTime());
    setQuizDetails([]);
  };

  return {
    handleOptionSelect,
    handleSubmit,
    handleNext,
    handleReload,
  };
};

export default useQuizLogic;
