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
      const quizDate =
        typeof quiz.date === "string" ? new Date(quiz.date) : quiz.date;
      const start =
        typeof quiz.startTime === "string"
          ? moment(
              `${quizDate.toISOString().split("T")[0]} ${quiz.startTime}`,
              "YYYY-MM-DD HH:mm"
            ).toDate()
          : quiz.startTime;
      const end =
        typeof quiz.endTime === "string"
          ? moment(
              `${quizDate.toISOString().split("T")[0]} ${quiz.endTime}`,
              "YYYY-MM-DD HH:mm"
            ).toDate()
          : quiz.endTime;

      if (isNaN(start.getTime())) {
        errors.startTime = "Invalid start time.";
      } else if (isNaN(end.getTime())) {
        errors.endTime = "Invalid end time.";
      } else if (end <= start) {
        errors.endTime = "End time must be later than start time.";
      }
    }
  }

  return errors;
};
