import jsPDF from "jspdf";

export const generatePdfBlob = (quizDetails) => {
  // If quizDetails is an array, use the first element.
  const data = Array.isArray(quizDetails) ? quizDetails[0] : quizDetails;

  // Create a new jsPDF instance.
  const doc = new jsPDF();

  // -------------------------------
  // Header: Quiz Results Title
  // -------------------------------
  // Set title styling: bold, larger size, and a dark gray color.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Quiz Results", 14, 22);

  // Draw a horizontal line below the title.
  doc.setLineWidth(0.5);
  doc.line(14, 24, 196, 24);

  // -------------------------------
  // Content: User Details and Quiz Summary
  // -------------------------------
  // Reset font for the content.
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  let yPosition = 32;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  // Helper: check for page overflow.
  const checkPageOverflow = () => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Section Header: User Details.
  doc.setFont("helvetica", "bold");
  doc.text("User Details :", 14, yPosition);
  yPosition += lineHeight;
  checkPageOverflow();
  // Draw a line under the header.
  doc.setLineWidth(0.3);
  // doc.line(14, yPosition - 4, 196, yPosition - 4);

  // Reset font.
  doc.setFont("helvetica", "normal");

  // User Name.
  doc.text(
    `Name: ${data.userName.slice(0, 1).toUpperCase() + data.userName.slice(1)}`,
    14,
    yPosition
  );
  yPosition += lineHeight;
  checkPageOverflow();

  // Total Questions Played.
  doc.text(`Total Questions: ${data.numberOfPlays}`, 14, yPosition);
  yPosition += lineHeight;
  checkPageOverflow();

  // Date (if available).
  if (data.date && data.date.length) {
    doc.text(`Date: ${data.date[data.date.length - 1]}`, 14, yPosition);
    yPosition += lineHeight;
    checkPageOverflow();
  }

  // Total Score.
  if (data.totalScore !== undefined) {
    doc.text(`Total Score: ${data.totalScore}`, 14, yPosition);
    yPosition += lineHeight;
    checkPageOverflow();
  }

  // Add a section separator line before Quiz Details.
  yPosition += 4;
  doc.setLineWidth(0.5);
  doc.line(14, yPosition, 196, yPosition);
  yPosition += lineHeight;
  checkPageOverflow();

  // Section Header: Quiz Details.
  doc.setFont("helvetica", "bold");
  doc.text("Quiz Details", 14, yPosition);
  yPosition += lineHeight;
  checkPageOverflow();
  // Underline the header.
  doc.setLineWidth(0.3);
  doc.line(14, yPosition - 4, 196, yPosition - 4);

  // Reset font.
  doc.setFont("helvetica", "normal");

  // -------------------------------
  // Loop through Quiz Questions and Answers.
  // -------------------------------
  if (data.result && data.result.length) {
    data.result.forEach((resultItem, ind) => {
      // Display the Quiz Type.
      if (resultItem.quizType) {
        yPosition += lineHeight;
        checkPageOverflow();
        doc.setFont("helvetica", "bold");

        // Print Quiz Type on one line.
        doc.text(`Quiz Type: ${resultItem.quizType}`, 14, yPosition);
        doc.setFont("helvetica", "normal");
        yPosition += lineHeight;
        checkPageOverflow();
      }

      // Check and print Date & Time.
      if (data.date && data.date.length) {
        const dateTimeStr = data.date[ind];

        if (dateTimeStr) {
          const parts = dateTimeStr.split(", ");
          const displayDate = parts[0] || dateTimeStr;
          const displayTime = parts[1] || "";

          // Print date on its own line.
          doc.text(`Date: ${displayDate}`, 14, yPosition);
          yPosition += lineHeight;
          checkPageOverflow();

          // Print time on the next line (if available).
          if (displayTime) {
            doc.text(`Time: ${displayTime}`, 14, yPosition);
            yPosition += lineHeight;
            checkPageOverflow();
          }
        }
      }

      // Display each quiz question block.
      if (resultItem.quizDetails && resultItem.quizDetails.length) {
        resultItem.quizDetails.forEach((q, index) => {
          // Draw a thin horizontal line as a separator before each question block.
          doc.setLineWidth(0.1);
          doc.line(14, yPosition, 196, yPosition);
          yPosition += 5;
          checkPageOverflow();

          // Display Question.
          doc.setFont("helvetica", "bold");
          doc.text(`${index + 1}. ${q.question}`, 14, yPosition);
          doc.setFont("helvetica", "normal");
          yPosition += lineHeight;
          checkPageOverflow();

          // Display the answer provided.
          doc.text(`Your Answer: ${q.selectedValue}`, 14, yPosition);
          yPosition += lineHeight;
          checkPageOverflow();

          // Display the correct answer.
          doc.text(`Correct Answer: ${q.correctAnswer}`, 14, yPosition);
          yPosition += lineHeight;
          checkPageOverflow();

          // Add extra spacing between questions.
          yPosition += 2;
          checkPageOverflow();
        });
      }
    });
  }

  // -------------------------------
  // Final Separator at End
  // -------------------------------
  doc.setLineWidth(0.5);
  doc.line(14, yPosition, 196, yPosition);

  // Save the PDF.
  // doc.save("quiz-results.pdf");

  // --- Generate a PDF Blob ---
  const pdfBlob = doc.output("blob");

  // a Blob URL for a local preview.
  const localBlobUrl = URL.createObjectURL(pdfBlob);

  return { localBlobUrl, pdfBlob };
};
