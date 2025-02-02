export const checkQuizAvailability = (quizzes) => {
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

  console.log("Quiz Start Time:", quizStartTime.toISOString());
  console.log("Quiz End Time:", quizEndTime.toISOString());
  console.log("Current Time:", now.toISOString());

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
