import moment from "moment";

const getFormattedTime = (time) => {
  // If time is a Firebase Timestamp (object with seconds)
  if (time && typeof time === "object" && time.seconds) {
    return moment(time.seconds * 1000).format("HH:mm");
  }
  // If time is already a string, assume it's in "HH:mm" format
  return time;
};

export const checkHasChanges = (quizData, matchedQuiz) => {
  const formattedDate = moment(quizData.date).format("YYYY-MM-DD");
  const matchedDate =
    matchedQuiz?.startTime &&
    typeof matchedQuiz.startTime === "object" &&
    matchedQuiz.startTime.seconds
      ? moment(matchedQuiz.startTime.seconds * 1000).format("YYYY-MM-DD")
      : quizData.date;

  const isDaily = Boolean(quizData?.isDailyQuestion);
  const matchedIsDaily = Boolean(matchedQuiz.isDailyQuiz);

  const formattedStartTime = moment(quizData.startTime, "HH:mm").format(
    "HH:mm"
  );
  const matchedStartTime = getFormattedTime(matchedQuiz?.startTime);

  const formattedEndTime = moment(quizData.endTime, "HH:mm").format("HH:mm");
  const matchedEndTime = getFormattedTime(matchedQuiz?.endTime);

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
