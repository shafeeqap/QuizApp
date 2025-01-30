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
  if (quiz.quizType==='daily') {
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
};
