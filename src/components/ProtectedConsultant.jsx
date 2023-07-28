import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "Context/AuthProvider";

const PrivateRoutesConsultant = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);
  const { consultantLogin } = state;
  return consultantLogin?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/consultant" state={{ from: location }} />
  );
};

export default PrivateRoutesConsultant;
