import { quizDetails } from "../user/quizDetails";
import downloadPdf from "../../../utils/downloadPdf/downloadPdf";

const QuizResults = () => {
  const usersWithQuizDetails = quizDetails();

  const handleDownloadPdf = () => {
    console.log('Hi...........');
    
    downloadPdf(usersWithQuizDetails);
  };

//   return handleDownloadPdf;
};

export default QuizResults;
