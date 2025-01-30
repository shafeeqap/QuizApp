import { useContext, useState } from "react";
import "./AddQuiz.css";
import { db } from "../../../../utils/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addQuizValidateForm } from "../../../../utils/validation/addQuizValidation";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import Button from "../../../../components/Button/Button";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import moment from "moment";
import { mergeDateAndTime } from "../mergeDateAndTime";
import QuizzesContext from "../../../../context/quizzesContext";

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    answer: "",
    isDailyQuiz: false,
    date: "",
    startTime: "",
    endTime: "",
  });

  const { isLoading, setIsLoading, fetchAndSetQuizzes } =
    useContext(QuizzesContext);

  const [errors, setErrors] = useState({});
  const [isDailyQuestion, setIsDailyQuestion] = useState(false);
  const [quizType, setQuizType] = useState("regular");

  // const date = new Date("2025-01-30");
  // const startTime = "20:00";
  // const endTime = "20:30";

  // const startTimestamp = mergeDateAndTime(date, startTime);
  // const endTimestamp = mergeDateAndTime(date, endTime);

  // console.log("Start Time:", startTimestamp);
  // console.log("End Time:", endTimestamp);

  const handleSelectChange = (e) => {
    const isDaily = e.target.value === "daily";
    const selectedType = e.target.value;

    setQuizType(selectedType);
    setIsDailyQuestion(isDaily);
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      isDailyQuiz: isDaily,
      date: isDaily ? prevQuiz.date : "",
      startTime: isDaily ? prevQuiz.startTime : "",
      endTime: isDaily ? prevQuiz.endTime : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = addQuizValidateForm(quiz);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    setIsLoading(true);

    try {
      const quizData = {
        question: quiz.question,
        options: [quiz.option1, quiz.option2, quiz.option3],
        answer: quiz.answer,
        isDailyQuiz: quiz.isDailyQuiz,
        startTime: quiz.isDailyQuiz ? mergeDateAndTime(quiz.date, quiz.startTime) : null,
        endTime: quiz.isDailyQuiz ? mergeDateAndTime(quiz.date, quiz.endTime) : null,
        createdAt: serverTimestamp(),
      };

      console.log(quizData, 'Quiz Data');

      const docRef = await addDoc(collection(db, "quizzes"), quizData);
      console.log("Quiz added with ID: ", docRef.id);
      toast.success("Quiz added successfully!");
      setQuiz({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        answer: "",
        isDailyQuiz: false,
        date: "",
        startTime: "",
        endTime: "",
      });
      await fetchAndSetQuizzes();
    } catch (error) {
      console.error("Error adding quiz: ", error);
      toast.error("Error adding quiz");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h3>Add Quiz</h3>
      </div>
      <div style={{ textAlign: "end" }}>
        <IoMdArrowRoundBack size={20} cursor={"pointer"} />{" "}
      </div>

      <section className="info">
        <form onSubmit={handleSubmit}>
          <label>Question</label>
          <article
            className="question"
            style={{
              padding: "1rem",
            }}
          >
            <label htmlFor="quizType">Choose Quiz Type:</label>
            <select
              className="select-option"
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
                    selected={quiz.date ? new Date(quiz.date) : null}
                    onChange={(date) => setQuiz((prev) => ({ ...prev, date }))}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="custom-datepicker"
                  />
                  {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="start-at">
                  <label htmlFor="startTime">Start at:</label>
                  <TimePicker
                    hourPlaceholder="HH"
                    minutePlaceholder="MM"
                    amPmPlaceholder="AM/PM"
                    name="startTime"
                    value={
                      quiz.startTime
                        ? moment(quiz.startTime, "HH:mm").toDate()
                        : null
                    }
                    onChange={(value) =>
                      setQuiz((prevQuiz) => ({ ...prevQuiz, startTime: value }))
                    }
                    className="custom-timepicker"
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
                    amPmPlaceholder="AM/PM"
                    name="endTime"
                    value={
                      quiz.endTime
                        ? moment(quiz.endTime, "HH:mm").toDate()
                        : null
                    }
                    onChange={(value) =>
                      setQuiz((prevQuiz) => ({ ...prevQuiz, endTime: value }))
                    }
                    className="custom-timepicker"
                  />
                  {errors.endTime && (
                    <span className="error">{errors.endTime}</span>
                  )}
                </div>
                {errors.time && <span className="error">{errors.time}</span>}
              </div>
            )}
          </article>
          <article className="question">
            <div className="input-container">
              <input
                type="text"
                placeholder="Add question"
                name="question"
                value={quiz.question}
                onChange={handleChange}
                id="question"
              />
              {errors.question && (
                <span className="error">{errors.question}</span>
              )}
            </div>
          </article>
          <label>Options</label>
          <article className="question">
            {/* Option 1 */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Add option 1"
                name="option1"
                value={quiz.option1}
                onChange={handleChange}
                id="option1"
              />
              {errors.option1 && (
                <span className="error">{errors.option1}</span>
              )}
            </div>
            {/* Option 2 */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Add option 2"
                name="option2"
                value={quiz.option2}
                onChange={handleChange}
                id="option2"
              />
              {errors.option2 && (
                <span className="error">{errors.option2}</span>
              )}
            </div>
            {/* Option 3 */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Add option 3"
                name="option3"
                value={quiz.option3}
                onChange={handleChange}
                id="option3"
              />
              {errors.option3 && (
                <span className="error">{errors.option3}</span>
              )}
            </div>
          </article>
          <label>Answer</label>
          <article className="question">
            <div className="input-container">
              <input
                type="text"
                placeholder="Add answer"
                name="answer"
                value={quiz.answer}
                onChange={handleChange}
                id="answer"
              />
              {errors.answer && <span className="error">{errors.answer}</span>}
            </div>
          </article>
          <Button type="submit">
            {isLoading ? (
              <Loading height={"40px"} width={"40px"} color={"#fff"} />
            ) : (
              "Submit Quiz"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddQuiz;
