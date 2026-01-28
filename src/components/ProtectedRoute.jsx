import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

