import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";


// Fetch quizess from database
export const fetchQuizzes = async () => {
  const querySnapshot = await getDocs(collection(db, "quizzes"));

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

