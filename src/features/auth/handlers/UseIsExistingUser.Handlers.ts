import { useDispatch, useSelector } from "react-redux";
import { toggleExistingUser } from "../slices/ExistingUser.Slice";
import { type RootState } from "../../../store/store";

// handlers that would update redux state
export function useIsExistingUsersHandler() {
// initializing dispatch
  const dispatch = useDispatch();
// getting state from redux
  const isExistingUser = useSelector(
    (state: RootState) => state.existingUser.isExistingUser
  ); //basically this state is tracking whether we are dealing with a new User or an existing one

// creating dispatch instance
  const handleToggle = () => dispatch(toggleExistingUser());
  return { isExistingUser, handleToggle };
}//exports state and dispatch





