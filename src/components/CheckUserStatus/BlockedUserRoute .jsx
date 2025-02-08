import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/config/firebase";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { Navigate, Outlet } from "react-router-dom";

const BlockedUserRoute = () => {
  const { user, setUser } = useContext(UserContext);
  const [isChecking, setIsChecking] = useState(true);


  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user){
        setIsChecking(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const updatedUser = userDoc.data();
          setUser(updatedUser);

          if (updatedUser.isBlocked) {
            toast.error("Your account is blocked.");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
      setIsChecking(false);
    };

    checkUserStatus();
  }, [user, setUser]);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading height={"80px"} width={"80px"} color={"#fff"} />
      </div>
    );
  }

  return user?.isBlocked ? <Navigate to="/blocked" replace /> : <Outlet />;
};

export default BlockedUserRoute;
