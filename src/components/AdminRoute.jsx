import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const currentUser = useSelector(state => state.auth.currentUser);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!currentUser.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
