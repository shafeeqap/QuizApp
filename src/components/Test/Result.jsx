import { useContext, useState } from "react";
import PdfPreview from "../../utils/downloadPdf/PdfPreview";
import UserContext from "../../context/userContext";
import { quizDetails } from "../../utils/helper/user/quizDetails";
import SocialShare from "../SocialShare/SocialShare";

const Result = () => {
  const { user } = useContext(UserContext);
  const usersWithQuizDetails = quizDetails([user]);
  const [pdfPublicUrl, setPdfPublicUrl] = useState("");

  return (
    <div >
      <PdfPreview quizDetails={usersWithQuizDetails} onPdfPublicUrl={setPdfPublicUrl}/>
      <SocialShare pdfUrl={pdfPublicUrl} />
    </div>
  );
};

export default Result;
