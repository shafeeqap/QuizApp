import { useContext } from "react";
import PdfPreview from "../../components/PdfPreview/PdfPreview";
import UserContext from "../../context/userContext";
import { quizDetails } from "../../utils/helper/user/quizDetails";

const PdfDownloadPage = () => {
  const { user, setPdfPublicUrl } = useContext(UserContext);
  const usersWithQuizDetails = quizDetails([user]);

  return (
    <div>
      <PdfPreview
        quizDetails={usersWithQuizDetails}
        onPdfPublicUrl={setPdfPublicUrl}
      />
    </div>
  );
};

export default PdfDownloadPage;
