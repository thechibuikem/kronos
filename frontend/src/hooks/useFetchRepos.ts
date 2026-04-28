// src/hooks/useOAuthToken.ts
import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "./hooks";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";
import type { RootState } from "@/store/store";

export function useFetchRepos() {
  const dispatch = useAppDispatch();
   let { getRepos } = useAllReposHandler();
  const isAuthorized = useAppSelector(
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
