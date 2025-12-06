import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "./features/loading/page/LoadingPage";
import { type RootState } from "./store/centralStore";
import api from "./api/axiosInterceptor"; //interceptor instance

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const reduxToken = useSelector(
    (state: RootState) => state.authenticated.isAuthenticated
  );
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [authorizedState, setAuthorizedState] = useState(false);

  useEffect(() => {
    async function validate() {
      try {
        // Always try calling a backend endpoint to check token validity.using your interceptor ensures that if access token is expired,it will automatically refresh via your interceptor logic.
        await api.post("/api/auth/validate-token");
        // If it succeeds, token is valid
        setAuthorizedState(true);
      } catch {
        // If it fails (refresh also failed), redirect to login
        setAuthorizedState(false);
      } finally {
        setChecking(false);
      }
    }
    validate();
  }, [reduxToken, dispatch]);

  if (checking) return <LoadingPage/>;
  if (!authorizedState) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
