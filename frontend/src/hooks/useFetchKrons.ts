
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";

import { useAllKronsHandler } from "@/features/krons/handlers/allKrons.Handlers";
import type { RootState } from "@/store/store";

export function useFetchKrons() {
  const dispatch = useAppDispatch();
  let { getKrons } = useAllKronsHandler();
  const isAuthorized = useAppSelector(
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
