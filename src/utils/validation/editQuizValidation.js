import moment from "moment";

export const editValidateForm = (quiz) => {
  const errors = {};

  // Validate question
  if (!quiz.question || quiz.question.trim() === "") {
    errors.question = "Question is required.";
  }

  // Validate options
  if (!quiz.options || quiz.options.length < 2) {
    errors.options = "At least two options are required.";
  } else {
    quiz.options.forEach((option, index) => {
      if (!option || option.trim() === "") {
        errors[`option${index}`] = `Option ${index + 1} is required.`;
      }
    });
  }

  // Validate answer
  if (!quiz.answer || quiz.answer.trim() === "") {
    errors.answer = "Answer is required.";
  } else if (!quiz.options.includes(quiz.answer)) {
    errors.answer = "Answer must match one of the provided options.";
  }

  // Start time and end time.
  if (quiz.quizType === "daily") {
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
};
