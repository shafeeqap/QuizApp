import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const BlockedUserRoute = () => {
  const { user } = useContext(UserContext);

  // if (user === undefined || user === null) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <Loading height={"80px"} width={"80px"} color={"#fff"} />
  //     </div>
  //   );
  // }

  if (user && user.isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  return <Outlet />;
};

export default BlockedUserRoute;
