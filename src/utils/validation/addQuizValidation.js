import moment from "moment";

export function addQuizValidateForm(quiz) {
  const errors = {};

  if (!quiz.question.trim()) {
    errors.question = "Please enter question.";
  }
  if (!quiz.option1.trim()) {
    errors.option1 = "Please enter option 1.";
  }
  if (!quiz.option2.trim()) {
    errors.option2 = "Please enter option 2.";
  }
  if (!quiz.option3.trim()) {
    errors.option3 = "Please enter option 3.";
  }

  // Validate answer
  if (!quiz.answer || quiz.answer.trim() === "") {
    errors.answer = "Answer is required.";
  } else if (
    quiz.answer !== quiz.option1 &&
    quiz.answer !== quiz.option2 &&
    quiz.answer !== quiz.option3
  ) {
    errors.answer = "Answer must match one of the provided options.";
  }

  // Date and times for the start and end of the quiz.
  if (quiz.isDailyQuiz) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!quiz.date || isNaN(new Date(quiz.date).getTime())) {
      errors.date = "Date is required for daily quiz.";
    } else if (new Date(quiz.date) < today) {
      errors.date = "Date cannot be in the past.";
    }
    if (!quiz.startTime) {
      errors.startTime = "Start time is required for daily quiz.";
    }
    if (!quiz.endTime) {
      errors.endTime = "End time is required for daily quiz.";
    }
    if (quiz.startTime && quiz.endTime) {
      const start = moment(quiz.startTime, "HH:mm");
      const end = moment(quiz.endTime, "HH:mm");

      if (!start.isValid() || !end.isValid()) {
        errors.time = "Invalid time format.";
      } else if (end.isSameOrBefore(start)) {
        errors.time = "End time must be later than start time.";
      }
    }
  }

  return errors;
}
