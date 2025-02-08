import { useEffect, useState } from "react";
import { db, auth } from "../../utils/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";

const ProtectRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (userData?.role === "admin") {
              setIsAuthorized(true);
            } else {
              setIsAuthorized(false);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      });
    };
    checkAuth();
  }, [auth, db]);

  if (isAuthorized === null) {
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

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node,
};
export default ProtectRoute;
