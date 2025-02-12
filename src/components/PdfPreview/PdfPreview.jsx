import { useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/userContext";
import { generatePdfBlob } from "../../utils/generatePdf/generatePdfBlob";

const PdfPreview = ({ quizDetails, width = "100%", height = "750px" }) => {
  const { pdfUrl, setPdfUrl } = useContext(UserContext);

  const memoizedBlobData = useMemo(() => {
    return generatePdfBlob(quizDetails);
  }, [JSON.stringify(quizDetails)]);

  useEffect(() => {
    const { localBlobUrl } = memoizedBlobData;

    if (pdfUrl !== localBlobUrl) {
      setPdfUrl(localBlobUrl);
    }

    return () => {
      URL.revokeObjectURL(localBlobUrl);
    };
  }, [memoizedBlobData, setPdfUrl, pdfUrl]);

  return (
    <div style={{backgroundColor:"#333333"}}>
      <iframe
        src={pdfUrl}
        width={width}
        height={height}
        title="PDF Preview"
        style={{ border: "none"}}
      />
    </div>
  );
};

PdfPreview.propTypes = {
  quizDetails: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default PdfPreview;
