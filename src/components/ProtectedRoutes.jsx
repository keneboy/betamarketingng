import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "Context/AuthProvider";
import { isValidToken } from "components/jwt";

const PrivateRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);
  const { adminLogin: login } = state;
  // console.log(login?.accessToken);
  // console.log("reaching here");

  return isValidToken(login?.accessToken) ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" state={{ from: location }} />
  );
};

export default PrivateRoutes;
