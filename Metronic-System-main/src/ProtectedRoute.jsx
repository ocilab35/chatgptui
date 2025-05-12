import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/Sign-In" />;
  }
  return children;
};

export default ProtectedRoute;
