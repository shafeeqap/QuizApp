import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { fetchQuizzes } from "../utils/helperQuizzes/fetchQuizzes";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/config/firebase";
import { toast } from "react-toastify";
import { convertTimeStringToDate } from "../utils/convertTime/convertTimeStringToDate";

const QuizzesContext = createContext();

export const QuizzesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [isDailyQuiz, setIsDailyQuiz] = useState([]);
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

  // ----------------- Convert end time to count down //
  const convertEndTimeToCountdown = (endTime) => {
    if (!endTime) return 0;

    const quizEndTime = convertTimeStringToDate(endTime);
    const quizEndTimeMs = quizEndTime.getTime();

    console.log(quizEndTimeMs, "Quiz End Time in Milliseconds");

    const now = Date.now();

    // Calculate remaining time in milliseconds
    const countDownDuration = quizEndTimeMs - now;

    return countDownDuration > 0 ? countDownDuration : 0;
  };

  useEffect(() => {
    if (isDailyQuiz?.length && isDailyQuiz[0].endTime) {
      const { endTime } = isDailyQuiz[0];

      const countDownDuration = convertEndTimeToCountdown(endTime);
      setQuizEndTime(countDownDuration);

      console.log(
        new Date(countDownDuration + Date.now()).toLocaleString(),
        "Local time"
      );
    } else {
      console.log("No daily quiz data yet.");
    }
  }, [isDailyQuiz]);

  // ----------------- Access quizzes from Firebase //
  const fetchAndSetQuizzes = async () => {
    setIsLoading(true);
    try {
      const fetchedQuizzes = await fetchQuizzes();
      setQuizzes(fetchedQuizzes);

      // Filter daily quizzes
      const dailyQuizzes = fetchedQuizzes.filter(
        (quiz) => quiz.isDailyQuiz === true
      );
      setIsDailyQuiz(dailyQuizzes);

      return fetchedQuizzes;
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Update Quiz in state context //
  const updateQuizInContext = (updatedQuiz) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? { ...quiz, ...updatedQuiz } : quiz
      )
    );
  };

  // ----------------- Save user quiz result to Firebase //
  const saveQuizResult = async (userId, score, timeTaken, quizDetails) => {
    console.log(userId, "userId");

    if (!userId) {
      localStorage.setResult(
        "userResult",
        userId,
        score,
        timeTaken,
        quizDetails
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
      setQuizzes([]);
      const newQuizzes = await fetchAndSetQuizzes();
      setQuizzes(newQuizzes);
    } catch (error) {
      console.error("Error resetting quizzes:", error);
    }
  };

  //-------------- useQuizzes hook helper functions Start ------------//
  const finalizeQuiz = (userId, updatedScore, updatedQuizDetails) => {
    const quizEndTime = new Date().getTime();
    const calculatedTimeTaken = Math.round(
      (quizEndTime - quizStartTime) / 1000
    );

    // console.log(quizStartTime, "quizStartTime");
    // console.log(quizEndTime, "quizEndTime");
    // console.log(calculatedTimeTaken, "calculatedTimeTaken");

    setTimeTaken(calculatedTimeTaken);
    setScore(updatedScore);

    // saveQuizResult(
    //   userId,
    //   updatedScore,
    //   calculatedTimeTaken,
    //   updatedQuizDetails
    // );

    console.log("Saving Quiz Result:", {
      userId: userId,
      score: updatedScore,
      timeTaken: calculatedTimeTaken,
      quizDetails: updatedQuizDetails,
    });
  };

  const updateQuizState = (updatedScore, updatedQuizDetails) => {
    setQuizDetails(updatedQuizDetails);
    setScore((prev) => prev + (updatedScore ? 1 : 0));
    setShowSubmit(false);
    setShowNext(true);
  };

  //-------------- useQuizzes hook helper functions End ------------//

  useEffect(() => {
    fetchAndSetQuizzes();
  }, []);

  return (
    <QuizzesContext.Provider
      value={{
        isLoading,
        quizzes,
        score,
        isDailyQuiz,
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
        setQuizzes,
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
