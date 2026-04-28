import { type ReactNode, useEffect, useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "./features/loading/page/LoadingPage";
import api from "./api/http/axios.Interceptor"; //interceptor instance
import { useOAuthToken } from "./hooks/useOauthToken";
import type { RootState } from "./store/store";
import { setIsAuthorized } from "./features/auth/slices/Authenthicated.Slice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  useOAuthToken()
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const isAuthorized = useSelector((state:RootState)=>state.authenticated.isAuthorized)
  


  // 1. side effect to allow access to my protected route
  useEffect(() => {
    async function validate() {
      try {
        await api.post("/api/v1/auth/validate-token");
        dispatch(setIsAuthorized(true));
      } catch {
        dispatch(setIsAuthorized(false));
      } finally {
        setChecking(false);
      }
    }
    validate();
  }, []);



  // console.log("repos from frontend: ",repos)
  if (checking) return <LoadingPage />;
  if (!isAuthorized) return <Navigate to="/" replace />;

  return <>{children}</>;
};



export default ProtectedRoute;
