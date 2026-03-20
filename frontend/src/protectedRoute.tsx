import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "./features/loading/page/LoadingPage";
import { type RootState } from "./store/store";
import api from "./api/http/axios.Interceptor"; //interceptor instance
import { useAllReposHandler } from "./features/repositories/handlers/allRepo.Handlers";
import { useAllKronsHandler } from "./features/kronList/handlers/allKrons.Handlers";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const reduxToken = useSelector(
    (state: RootState) => state.authenticated.accessToken
  );
  const dispatch = useDispatch();
  let { getRepos } = useAllReposHandler();
  let { getKrons} = useAllKronsHandler();
  const [checking, setChecking] = useState(true);
  const [authorizedState, setAuthorizedState] = useState(false);

  // 1. side effect to allow access to my protected route
  useEffect(() => {
    async function validate() {
      try {
        await api.post("/api/auth/validate-token");
        console.log("nigga it worked!"); // If it succeeds, token is valid
        setAuthorizedState(true);
      } catch {
        console.log("nigga it ain't working."); // If it fails, redirect to login
        setAuthorizedState(false);
      } finally {
        setChecking(false);
      }
    }
    validate();
  }, [reduxToken, dispatch]);

  // use effect to get all repos
  useEffect(() => {
    function fetchRepos() {
      if (authorizedState) {
        getRepos();
      } else {
        // console.log("cannot retrieve repository as user is unauthorized");
      }
    }
    fetchRepos();
  }, [authorizedState, dispatch]);

  // use effect to get all krons
  useEffect(() => {
    function fetchKrons() {
      if (authorizedState) {
        getKrons();
      } else {
        // console.log("cannot retrieve krons as user is unauthorized");
      }
    }
    fetchKrons();
  }, [authorizedState, dispatch]);

  // console.log("repos from frontend: ",repos)
  if (checking) return <LoadingPage />;
  if (!authorizedState) return <Navigate to="/" replace />;

  return <>{children}</>;
};



export default ProtectedRoute;
