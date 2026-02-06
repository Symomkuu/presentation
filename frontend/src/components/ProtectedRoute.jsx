import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) return null; // or a loading spinner
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
