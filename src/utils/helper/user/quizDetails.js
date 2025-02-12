export const quizDetails = (users = []) => {
  const filteredUsers = users.filter((user) => user && user.role !== "admin");

  const usersWithQuizDetails = filteredUsers.map((user) => {
    const { name: userName, email, quizResults = [] } = user;

    const totalScore = quizResults.reduce((sum, quiz) => sum + quiz.score, 0);

    const numberOfPlays = user.quizResults?.length;

    const result = quizResults.map((quiz) => {
      const { quizType, timeTaken, quizDetails } = quiz;

      return { quizType, timeTaken, quizDetails };
    });

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const date = quizResults.map((result) =>
      new Date(result.date).toLocaleString("en-GB", options)
    );

    const timeTaken = quizResults.map((result) => result.timeTaken);
    const score = quizResults.map((result) => result.score);

    return {
      userName,
      email,
      totalScore,
      numberOfPlays,
      timeTaken,
      score,
      date,
      result,
    };
  });

  return usersWithQuizDetails;
};
