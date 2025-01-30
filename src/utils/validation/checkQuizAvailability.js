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
    
    const now = new Date();

    const today = now.toISOString().split("T")[0];
    
    // Convert startTime and endTime
    const [startHours, startMinutes] = quiz.startTime.split(":").map(Number);
    const [endHours, endMinutes] = quiz.endTime.split(":").map(Number);

    // Construct start and end Date objects for today
    const startTime = new Date(today);
    startTime.setHours(startHours, startMinutes, 0, 0); // Set HH:MM:SS:MS

    const endTime = new Date(today);
    endTime.setHours(endHours, endMinutes, 0, 0); // Set HH:MM:SS:MS

    const currentTime = now.getTime();

    if (currentTime < startTime.getTime()) {
      return {
        isAvailable: false,
        message: "The quiz has not started yet. Please try again later.",
      };
    } else if (currentTime > endTime.getTime()) {
      return {
        isAvailable: false,
        message: "The quiz has ended. Please try again tomorrow.",
      };
    } else {
      return { isAvailable: true, message: "You can start the quiz now!" };
    }
  };
