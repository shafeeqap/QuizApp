export const checkQuizAvailability = (quizzes, user) => {
  if (!quizzes || !Array.isArray(quizzes) || quizzes.length === 0) {
    console.error("Invalid quiz data:", quizzes);
    return { isAvailable: false, message: "No quizzes found." };
  }

  const quiz = quizzes[0];

  if (!quiz.startTime || !quiz.endTime) {
    console.error("Quiz startTime or endTime is missing:", quiz);
    return {
      isAvailable: false,
      message: "Quiz start time or end time is missing.",
    };
  }

  const quizStartTime = new Date(quiz.startTime.seconds * 1000);
  const quizEndTime = new Date(quiz.endTime.seconds * 1000);
  const now = new Date();

  const dailyQuizzes = user.quizResults.filter(
    (quiz) => quiz.quizType === "DailyQuiz"
  );

  const today = new Date().toISOString().split("T")[0];

  const quizTakenToday = dailyQuizzes.find((quiz) => {
    const quizDate = quiz.date.split("T")[0];

    return quizDate === today;
  });

  if (quizTakenToday) {
    return {
      isAvailable: false,
      message: "Daily quizzes are not allowed more than one per day.",
    };
  }

  if (now < quizStartTime) {
    return {
      isAvailable: false,
      message: "The quiz has not started yet. Please try again later.",
    };
  } else if (now > quizEndTime) {
    return {
      isAvailable: false,
      message: "The quiz has ended. Please try again tomorrow.",
    };
  } else {
    return { isAvailable: true, message: "You can start the quiz now!" };
  }
};
