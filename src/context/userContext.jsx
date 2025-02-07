import { createContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/config/firebase";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchUsers } from "../utils/fetchUsers/fetchUsers";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // --------- Check if user is blocked (real-time updates)
  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const updatedUser = docSnap.data();

          localStorage.setItem("user", JSON.stringify(updatedUser));

          if (updatedUser.isBlocked) {
            toast.error("Your account is blocked.");
            localStorage.removeItem("user");
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  // ----------------- Fetch users list from Firebase //
  const loadUsers = async () => {
    setIsLoading(true);

    try {
      if (user?.role === "admin") {
        const userList = await fetchUsers();
        setUsers(userList);
      } else {
        console.log("User is not an admin, skipping users fetch.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      loadUsers();
    }
  }, [user]);

  // ----------------- Store user data to localStorage //.
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ----------------- Auth user //
  const authUser = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.isBlocked) {
          setUser(userData);
          return userData;
        } else {
          toast.error("User is blocked.");
          return null;
        }
      } else {
        toast.error("User data not found. Please check your account.");
        console.error("No document found for UID:", user.uid);
        throw new Error("User data not found. Please check your account.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error(error.message || "Failed to authenticate user.");
    }
  };

  // --------------------------------- Logout user //
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isLoading,
        setUser,
        authUser,
        setIsLoading,
        logout,
        loadUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
