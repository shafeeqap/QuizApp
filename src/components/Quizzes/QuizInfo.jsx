import { Timer } from "../Timer";
import PropTypes from "prop-types";
import { IoMdDownload } from "react-icons/io";
import Tooltipp from "../Tooltipp/Tooltipp";
import { quizDetails } from "../../utils/helper/user/quizDetails";
import downloadPdf from "../../utils/downloadPdf/downloadPdf";
import { useContext } from "react";
import UserContext from "../../context/userContext";

const QuizInfo = ({
  totalQuestions,
  currentQuestionIndex,
  isCompleted,
  quizzes,
  // user
}) => {
  const { user } = useContext(UserContext);
  // console.log(user, 'User');
  // console.log("Type of users:", typeof user);
  const usersWithQuizDetails = quizDetails([user]);
  // console.log("Type of Quiz Details:", typeof usersWithQuizDetails);

  // console.log(usersWithQuizDetails, 'usersWithQuizDetails');
  

  const handleDownloadPdf = () => {
    console.log("Downloading PDF...");
    downloadPdf(usersWithQuizDetails);
  };

  return (
    <div className="quiz-title">
      {!isCompleted ? (
        <>
          <h3 className="quiz-question">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </h3>
          {quizzes?.[0]?.isDailyQuiz && <Timer className="quiz-timer" />}
        </>
      ) : (
        <div className="congratulation">
          <h3>Congratulations!🎉</h3>
          <Tooltipp text={"Download"}>
            <IoMdDownload
              style={{ cursor: "pointer" }}
              onClick={handleDownloadPdf}
            />
          </Tooltipp>
        </div>
      )}
    </div>
  );
};

QuizInfo.propTypes = {
  totalQuestions: PropTypes.number,
  currentQuestionIndex: PropTypes.number,
  isCompleted: PropTypes.bool,
  countDownTimer: PropTypes.number,
  quizzes: PropTypes.array,
};
export default QuizInfo;
