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

  // Start time and end time.
  if (quiz.isDailyQuiz) {
    if (!quiz.startTime) {
      errors.startTime = "Start time is required for daily quiz.";
    }
    if (!quiz.endTime) {
      errors.endTime = "End time is required for daily quiz.";
    }
    if (quiz.startTime && quiz.endTime && quiz.endTime <= quiz.startTime) {
      errors.time = "End time must be later than start time.";
    }
  }

  return errors;
}
