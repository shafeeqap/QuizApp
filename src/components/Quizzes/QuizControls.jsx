import PropTypes from "prop-types";
import Button from "../Button/Button";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";

const QuizControls = ({ handleSubmit, handleNext, isLastQuestion }) => {
  const { showSubmit, showNext,} =
    useContext(QuizzesContext);
    

  return (
    <div className="submit-container">
      {showSubmit && (
        <Button size="small" type="button" onClick={handleSubmit}>
          Submit Answer
        </Button>
      )}
      {showNext && (
        <Button onClick={handleNext}>
          {isLastQuestion ? "Finish" : "Next Question"}
        </Button>
      )}
    </div>
  );
};

QuizControls.propTypes = {
  showSubmit: PropTypes.bool,
  showNext: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool,
};

export default QuizControls;
