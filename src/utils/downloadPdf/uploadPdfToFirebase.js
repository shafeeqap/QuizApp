import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";


const uploadPdfToFirebase = async (pdfBlob) => {
  //  a unique file name using the current timestamp.
  const fileName = `quiz-results-${Date.now()}.pdf`;
  const pdfRef = ref(storage, `pdfs/${fileName}`);

  try {
    // Upload the PDF Blob.
    await uploadBytes(pdfRef, pdfBlob);
    // Retrieve and return the public download URL.
    const downloadURL = await getDownloadURL(pdfRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
};

export default uploadPdfToFirebase;
