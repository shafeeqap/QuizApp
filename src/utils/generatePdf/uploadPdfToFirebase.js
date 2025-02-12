import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";


const uploadPdfToFirebase = async (pdfBlob) => {
  //  a unique file name using the current timestamp.
  const fileName = `quiz-results-${Date.now()}.pdf`;
  const pdfRef = ref(storage, `pdfs/${fileName}`);

  console.log(pdfBlob, "PDF Blob");
  

  try {
    // Upload the PDF Blob.
    console.log("Uploading PDF Blob...");
    const uploadResult = await uploadBytes(pdfRef, pdfBlob);
    console.log("Upload result:", uploadResult);

    // Retrieve and return the public download URL.
    const downloadURL = await getDownloadURL(pdfRef);
    console.log("Retrieved download URL:", downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
};

export default uploadPdfToFirebase;
