import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./EditQuiz.css";
import PropTypes from "prop-types";
import Loading from "../../../../components/Loading/Loading";
import { updateQuiz } from "../../../../utils/helperQuizzes/updateQuiz";
import { toast } from "react-toastify";
import { editValidateForm } from "../../../../utils/validation/editQuizValidation";
import { IoMdArrowRoundBack } from "react-icons/io";
import Button from "../../../../components/Button/Button";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import QuizzesContext from "../../../../context/quizzesContext";
import moment from "moment";
import DatePicker from "react-datepicker";
import { mergeDateAndTime } from "../mergeDateAndTime";

const EditQuiz = () => {
  const { isLoading, quizzes, setIsLoading, updateQuizInContext } =
    useContext(QuizzesContext);

  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");
  const matchedQuiz = quizzes?.find((quiz) => quiz.id === quizId);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});
  const [isDailyQuestion, setIsDailyQuestion] = useState(false);
  const [quizType, setQuizType] = useState("regular");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  console.log(isDailyQuestion, "isDailyQuestion");

  useEffect(() => {
    if (matchedQuiz) {
      setQuestion(matchedQuiz.question);
      setOptions(matchedQuiz.options);
      setAnswer(matchedQuiz.answer);
      setStartTime(matchedQuiz.startTime);
      setEndTime(matchedQuiz.endTime);

      const type = matchedQuiz.isDailyQuiz ? "daily" : "regular";

      console.log(type, "type");

      setQuizType(type);
      setIsDailyQuestion(matchedQuiz.isDailyQuiz);
    } else if (!isLoading) {
      console.error("No quiz matched the provided ID:", quizId);
      navigate("/show-quizzes");
    }
  }, [matchedQuiz, isLoading, navigate, quizId]);

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setQuizType(selectedType);
    setIsDailyQuestion(selectedType === "daily");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const quizToValidate = {
      question,
      options,
      answer,
      quizType: isDailyQuestion,
      date: isDailyQuestion ? date : "",
      startTime: isDailyQuestion ? startTime : "",
      endTime: isDailyQuestion ? endTime : "",
    };

    const validationErrors = editValidateForm(quizToValidate);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Check if there are any changes
      const hasChanges =
        question !== matchedQuiz.question ||
        JSON.stringify(options) !== JSON.stringify(matchedQuiz.options) ||
        answer !== matchedQuiz.answer ||
        isDailyQuestion !== matchedQuiz.isDailyQuiz ||
        (isDailyQuestion &&
          (date !== matchedQuiz.date ||
            startTime !== matchedQuiz.startTime ||
            endTime !== matchedQuiz.endTime));

      if (!hasChanges) {
        toast.warning(
          "Nothing updated; please make changes before submission."
        );
        setIsLoading(false);
        return;
      }

      const updatedQuiz = {
        id: quizId,
        question,
        options,
        answer,
        isDailyQuiz: isDailyQuestion,
        startTime: isDailyQuestion ?  mergeDateAndTime(date, startTime) : "",
        endTime: isDailyQuestion ? mergeDateAndTime(date, endTime) : "",
      };

      console.log(updatedQuiz, 'Updated Quiz');
      
      // const result = await updateQuiz(updatedQuiz);
      // if (result.success) {
      //   updateQuizInContext(updatedQuiz);
      //   toast.success("Quiz updated successfully");
      //   navigate("/show-quizzes");
      // } else {
      //   navigate("/edit-quiz");
      // }
    } catch (error) {
      console.error("Error updating quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading height={"80px"} width={"80px"} color={"#fff"} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="title">
        <h3>Edit Quiz</h3>
      </div>
      <div style={{ textAlign: "end", cursor: "pointer" }}>
        <IoMdArrowRoundBack size={20} />
      </div>
      {matchedQuiz ? (
        <form onSubmit={handleSubmit}>
          <article className="question">
            <div className="form-group">
              <label>Question:</label>
              <input
                className="form-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {errors.question && (
                <span className="error">{errors.question}</span>
              )}
            </div>
            <div className="form-group">
              <label>Options:</label>
              {options.map((option, index) => (
                <div key={index}>
                  <input
                    className="form-input"
                    type="text"
                    value={option}
                    onChange={(e) =>
                      setOptions((prev) =>
                        prev.map((opt, idx) =>
                          idx === index ? e.target.value : opt
                        )
                      )
                    }
                  />
                  {errors[`option${index}`] && (
                    <span className="error">{errors[`option${index}`]}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Answer:</label>
              <input
                className="form-input"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {errors.answer && <span className="error">{errors.answer}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="quizType">Choose Quiz Type:</label>
              <select
                className="select"
                name="quizType"
                id="quizType"
                value={quizType}
                onChange={handleSelectChange}
              >
                <option value="regular">Regular Quiz</option>
                <option value="daily">Daily Quiz</option>
              </select>

              {isDailyQuestion && (
                <div>
                  <div className="quiz-date">
                    <label htmlFor="quizDate">Quiz Date:</label>
                    <DatePicker
                      selected={date ? new Date(date) : null}
                      onChange={(selected) => setDate(selected)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      className="custom-datepicker"
                    />
                    {errors.date && (
                      <span className="error">{errors.date}</span>
                    )}
                  </div>
                  <div className="start-at">
                    <label htmlFor="startTime">Start at:</label>
                    <TimePicker
                      hourPlaceholder="HH"
                      minutePlaceholder="MM"
                      name="startTime"
                      value={
                        startTime ? moment(startTime, "HH:mm").toDate() : null
                      }
                      onChange={(value) => setStartTime(value)}
                    />
                    {errors.startTime && (
                      <span className="error">{errors.startTime}</span>
                    )}
                  </div>
                  <div className="end-at">
                    <label htmlFor="endTime">End at:</label>
                    <TimePicker
                      hourPlaceholder="HH"
                      minutePlaceholder="MM"
                      name="endTime"
                      value={endTime ? moment(endTime, "HH:mm").toDate() : null}
                      onChange={(value) => setEndTime(value)}
                    />
                    {errors.endTime && (
                      <span className="error">{errors.endTime}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit">
              {isLoading ? (
                <Loading height={"40px"} width={"40px"} color={"#fff"} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </article>
        </form>
      ) : (
        <p>No quiz found for the provided ID: {quizId}</p>
      )}
    </div>
  );
};

EditQuiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.string,
  }),
};

export default EditQuiz;
