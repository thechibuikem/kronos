import type { ReactNode } from "react";
import type React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "./app/centralStore";





// the interface for the return value of ProtectedRoute component
interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const reduxToken = useSelector(
    (state: RootState) => state.authenticated
  )
  const token = localStorage.getItem("token")|| reduxToken||"";//getting our token from either local storage or redux


  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
