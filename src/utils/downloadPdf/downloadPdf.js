import jsPDF from "jspdf";

const downloadPdf = (quizDetails) => {
  console.log(quizDetails, 'Quizz Details');
  
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Set a title
    doc.setFontSize(18);
    doc.text("Quiz Results", 14, 22);
  
    // Add quiz details with some spacing.
    doc.setFontSize(12);
    let yPosition = 32;
    const lineHeight = 10;
  
    // Title
    doc.text(`Quiz Title: ${quizDetails.title}`, 14, yPosition);
    yPosition += lineHeight;
  
    // Total Questions
    doc.text(`Total Questions: ${quizDetails.totalQuestions}`, 14, yPosition);
    yPosition += lineHeight;
  
    // Date
    doc.text(`Date: ${quizDetails.date}`, 14, yPosition);
    yPosition += lineHeight;
  
    // Score or any other detail
    if (quizDetails.score !== undefined) {
      doc.text(`Score: ${quizDetails.score}`, 14, yPosition);
      yPosition += lineHeight;
    }
  
    // You can list all questions and answers if you want:
    if (quizDetails.questions && quizDetails.questions.length) {
      quizDetails.questions.forEach((q, index) => {
        doc.text(`${index + 1}. ${q.question}`, 14, yPosition);
        yPosition += lineHeight;
        doc.text(`   Your Answer: ${q.userAnswer}`, 14, yPosition);
        yPosition += lineHeight;
        doc.text(`   Correct Answer: ${q.correctAnswer}`, 14, yPosition);
        yPosition += lineHeight;
        // Add some spacing between questions:
        yPosition += 2;
      });
    }
  
    // Save the PDF
    doc.save("quiz-results.pdf");
  };
  
  export default downloadPdf;