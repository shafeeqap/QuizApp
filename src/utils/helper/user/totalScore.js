export const totalScore = (users) => {
  const filteredUsers = users.filter((user) => user.role !== "admin");

  const usersWithTotalScore = filteredUsers.map((user) => {
    const { name: userName, quizResults = [] } = user;

    const totalScore = quizResults.reduce((sum, quiz) => sum + quiz.score, 0);

    const numberOfPlays = user.quizResults?.length;

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

    return { userName, totalScore, numberOfPlays, timeTaken, score, date };
  });

  return usersWithTotalScore;
};
