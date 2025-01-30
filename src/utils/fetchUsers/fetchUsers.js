import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchUsers = async () => {
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    
    if (userSnapshot.empty) {
      console.log("No users found.");
    }

    return userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
