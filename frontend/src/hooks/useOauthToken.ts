// src/hooks/useOAuthToken.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../features/auth/slices/Authenthicated.Slice";

export function useOAuthToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      dispatch(setAccessToken(token));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
}
