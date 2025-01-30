import PropTypes from "prop-types";
import { useState } from "react";
import "./Question.css";

const Question = ({
  id,
  question,
  options,
  answer,
  onSelectOption,
  showCorrectAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptions = (selectedValue) => {
    setSelectedOption(selectedValue);
    onSelectOption(id, selectedValue);
  };

  return (
    <>
      <article className="question">
        <h4>{question}</h4>

        <form>
          <div className="option-container">
            {options.map((option, index) => (
              <div key={option.id || index} className="options">
                <input
                  type="radio"
                  name={`question-${id}`}
                  value={option}
                  onChange={(e) => handleOptions(e.target.value)}
                  disabled={showCorrectAnswer}
                />
                <label htmlFor="radio">{option}</label>
              </div>
            ))}
          </div>
        </form>

        {showCorrectAnswer && (
          <div style={{ color: selectedOption === answer ? "green" : "red" }}>
            {selectedOption === answer ? (
              <>
                <span style={{ fontWeight: "bold" }}>Correct Answer:</span>{" "}
                {answer}
              </>
            ) : (
              <>
                <span style={{ fontWeight: "bold" }}>Incorrect Answer:</span>{" "}
                {selectedOption}.<p>Correct Answer: {answer}</p>
              </>
            )}
          </div>
        )}
      </article>
    </>
  );
};

Question.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  answer: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  showCorrectAnswer: PropTypes.bool.isRequired,
};

export default Question;
