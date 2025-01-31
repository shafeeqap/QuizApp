import moment from "moment";

export const checkHasChanges = (quizData, matchedQuiz) => {
  const formattedDate = moment(quizData.date).format("YYYY-MM-DD");
  const matchedDate = moment(matchedQuiz.startTime.seconds * 1000).format("YYYY-MM-DD");

  const isDaily = Boolean(quizData.isDailyQuestion);
  const matchedIsDaily = Boolean(matchedQuiz.isDailyQuiz);

  const formattedStartTime = moment(quizData.startTime, "HH:mm").format("HH:mm");
  const matchedStartTime = moment(matchedQuiz.startTime.seconds * 1000).format("HH:mm");

  const formattedEndTime = moment(quizData.endTime, "HH:mm").format("HH:mm");
  const matchedEndTime = moment(matchedQuiz.endTime.seconds * 1000).format("HH:mm");

  return (
    quizData.question !== matchedQuiz.question ||
    JSON.stringify(quizData.options) !== JSON.stringify(matchedQuiz.options) ||
    quizData.answer !== matchedQuiz.answer ||
    isDaily !== matchedIsDaily ||
    (isDaily &&
      (formattedDate !== matchedDate ||
        formattedStartTime !== matchedStartTime ||
        formattedEndTime !== matchedEndTime))
  );
};
