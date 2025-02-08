import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


// Update quiz to the database
export const updateQuiz = async (updatedQuiz) => {
  
    try {
      const docRef = doc(db, "quizzes", updatedQuiz.id);
      await updateDoc(docRef, {
        id: updatedQuiz.id,
        question: updatedQuiz.question,
        options: updatedQuiz.options,
        answer: updatedQuiz.answer,
        isDailyQuiz: updatedQuiz.isDailyQuiz,
        startTime:updatedQuiz.startTime,
        endTime:updatedQuiz.endTime,
      });
      console.log("Quiz updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Error updating quiz:", error);
      return { success: false, error };
    }
  };
  