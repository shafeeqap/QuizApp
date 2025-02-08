import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { fetchQuizzes } from "../utils/helper/quizzes/fetchQuizzes";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/config/firebase";
import { toast } from "react-toastify";

const QuizzesContext = createContext();

export const QuizzesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegularQuizzes, setIsRegularQuizzes] = useState([]);
  const [isDailyQuizzes, setIsDailyQuizzes] = useState([]);
  const [fetchedQuizzes, setFetchedQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(new Date().getTime());
  const [timeTaken, setTimeTaken] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [quizDetails, setQuizDetails] = useState([]);
  const [quizEndTime, setQuizEndTime] = useState(0);

  useEffect(() => {
    fetchAndSetQuizzes();
  }, []);

  // ----------------- Access quizzes from Firebase //
  const fetchAndSetQuizzes = async () => {
    setIsLoading(true);
    try {
      const fetchedQuizzes = await fetchQuizzes();
      setFetchedQuizzes(fetchedQuizzes);
      const dailyQuizzes = fetchedQuizzes.filter(
        (quiz) => quiz.isDailyQuiz === true
      );
      const regularQuizzes = fetchedQuizzes.filter(
        (quiz) => quiz.isDailyQuiz !== true
      );

      // Update state
      setIsDailyQuizzes(dailyQuizzes);
      setIsRegularQuizzes(regularQuizzes);

      return fetchedQuizzes;
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Convert end time to count down //
  const convertEndTimeToCountdown = (endTime) => {
    if (!endTime) return 0;
    const endTimeMilliseconds = endTime.seconds * 1000;
    return endTimeMilliseconds;
  };

  useEffect(() => {
    if (isDailyQuizzes?.length && isDailyQuizzes[0].endTime) {
      const { endTime } = isDailyQuizzes[0];
      const endTimeMilliseconds = convertEndTimeToCountdown(endTime);

      setQuizEndTime(endTimeMilliseconds);
    } else {
      console.log("No daily quiz data yet.");
    }
  }, [isDailyQuizzes]);

  // ----------------- Update Quiz in state context //
  const updateQuizInContext = (updatedQuiz) => {
    setFetchedQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? { ...quiz, ...updatedQuiz } : quiz
      )
    );
  };

  // ----------------- Save user quiz result to Firebase //
  const saveQuizResult = async (userId, score, timeTaken, quizDetails, quizType) => {
    console.log(userId, "userId");

    if (!userId) {
      localStorage.setResult(
        "userResult",
        userId,
        score,
        timeTaken,
        quizDetails,
        quizType
      );
      return;
    }
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef,
        {
          quizResults: arrayUnion({
            score,
            timeTaken,
            quizDetails,
            quizType,
            date: new Date().toISOString(),
          }),
        },
        { merge: true }
      );
      toast.success("Quiz result saved successfully!");
    } catch (error) {
      console.error("Error saving quiz result:", error);
      toast.error("Failed to save result.");
    }
  };

  // ----------------- Reset the state and fetch fresh quizzes //
  const resetQuiz = async () => {
    try {
      setFetchedQuizzes([]);
      const newQuizzes = await fetchAndSetQuizzes();
      setFetchedQuizzes(newQuizzes);
    } catch (error) {
      console.error("Error resetting quizzes:", error);
    }
  };

  //-------------- useQuizzes hook helper functions Start ------------//
  const finalizeQuiz = (userId, updatedScore, updatedQuizDetails, quizType) => {
    const quizEndTime = new Date().getTime();
    const calculatedTimeTaken = Math.round(
      (quizEndTime - quizStartTime) / 1000
    );

    setTimeTaken(calculatedTimeTaken);
    setScore(updatedScore);

    // saveQuizResult(
    //   userId,
    //   updatedScore,
    //   calculatedTimeTaken,
    //   updatedQuizDetails,
    //   quizType
    // );

    console.log("Saving Quiz Result:", {
      userId: userId,
      score: updatedScore,
      timeTaken: calculatedTimeTaken,
      quizDetails: updatedQuizDetails,
      quizType: quizType
    });
  };

  const updateQuizState = (updatedScore, updatedQuizDetails) => {
    setQuizDetails(updatedQuizDetails);
    setScore((prev) => prev + (updatedScore ? 1 : 0));
    setShowSubmit(false);
    setShowNext(true);
  };

  //-------------- useQuizzes hook helper functions End ------------//

  return (
    <QuizzesContext.Provider
      value={{
        isLoading,
        isRegularQuizzes,
        isDailyQuizzes,
        fetchedQuizzes,
        score,
        showSubmit,
        isCompleted,
        showNext,
        questionId,
        quizDetails,
        timeTaken,
        answeredQuestions,
        currentQuestionIndex,
        quizEndTime,
        setQuizEndTime,
        setIsLoading,
        setScore,
        setIsCompleted,
        setShowSubmit,
        setTimeTaken,
        setShowNext,
        setIsRegularQuizzes,
        setFetchedQuizzes,
        fetchAndSetQuizzes,
        updateQuizInContext,
        saveQuizResult,
        resetQuiz,
        setQuizDetails,
        finalizeQuiz,
        updateQuizState,
        setCurrentQuestionIndex,
        setAnsweredQuestions,
        setQuizStartTime,
        setQuestionId,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
};

QuizzesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default QuizzesContext;
