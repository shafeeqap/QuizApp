import { Timer } from "../Timer";
import PropTypes from "prop-types";
import { IoMdDownload } from "react-icons/io";
import Tooltipp from "../Tooltipp/Tooltipp";
import uploadPdfToFirebase from "../../utils/generatePdf/uploadPdfToFirebase";
import UserContext from "../../context/userContext";
import { useContext } from "react";
import { quizDetails } from "../../utils/helper/user/quizDetails";
import { generatePdfBlob } from "../../utils/generatePdf/generatePdfBlob";

const QuizInfo = ({
  totalQuestions,
  currentQuestionIndex,
  isCompleted,
  quizzes,
}) => {
  const { user, setPdfPublicUrl } = useContext(UserContext);
  const usersWithQuizDetails = quizDetails([user]);

  const handleDownloadPdf = async () => {
    console.log("Downloading PDF...");
    window.open("/download-pdf", "_blank");

    const { pdfBlob } = generatePdfBlob(usersWithQuizDetails);
    
    console.log(pdfBlob, 'Pdf Blob');

    try {
      // Upload the PDF Blob to your server and get a public URL.
      const publicUrl = await uploadPdfToFirebase(pdfBlob);
      console.log(publicUrl, "Public URL...");

      setPdfPublicUrl(publicUrl);
    } catch (error) {
      console.error("Failed to upload PDF to Firebase:", error);
    }
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
