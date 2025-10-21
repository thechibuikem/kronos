import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../Slices/LoggedInSlice";
import { type RootState } from "../../../app/centralStore";

// handlers that would update redux state
export function useAuthHandlers() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const handleToggle = () => dispatch(toggleLogin());

  return { isLogin, handleToggle };
}
