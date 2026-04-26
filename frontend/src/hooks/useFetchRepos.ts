// src/hooks/useOAuthToken.ts
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers";
import type { RootState } from "@/store/store";

export function useFetchRepos() {
  const dispatch = useDispatch();
   let { getRepos } = useAllReposHandler();
  const isAuthorized = useSelector(
    (state: RootState) => state.authenticated.isAuthorized,
  );

  // use effect to get all repos
  useEffect(() => {
    function fetchRepos() {
      if (isAuthorized) {
        getRepos();
      } 
    }
    fetchRepos();
  }, [isAuthorized, dispatch]);
}
