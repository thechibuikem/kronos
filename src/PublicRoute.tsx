import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./app/centralStore";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const reduxToken = useSelector(
    (state: RootState) => state.authenticated.isAuthenticated
  );
  const token = reduxToken? reduxToken : "";

  // If already logged in → redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Else show signup/login page
  return <>{children}</>;
};

export default PublicRoute;
