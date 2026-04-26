// src/hooks/useOAuthToken.ts
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useAllKronsHandler } from "@/features/kronList/handlers/allKrons.Handlers";
import type { RootState } from "@/store/store";

export function useFetchKrons() {
  const dispatch = useDispatch();
  let { getKrons } = useAllKronsHandler();
  const isAuthorized = useSelector(
    (state: RootState) => state.authenticated.isAuthorized,
  );

  // use effect to get all krons
  useEffect(() => {
    function fetchKrons() {
      if (isAuthorized) {
        getKrons();
      }
    }
    fetchKrons();
  }, [isAuthorized, dispatch]);
}
