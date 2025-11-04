import { useDispatch, useSelector } from "react-redux";
import { toggleExistingUser } from "../Slices/ExistingUserSlice";
import { type RootState } from "../../../app/centralStore";

// handlers that would update redux state
export function useNewOrExistingUsersHandlers() {
  const dispatch = useDispatch();
  const isExistingUser = useSelector(
    (state: RootState) => state.existingUser.isExistingUser
  ); //basically this state is tracking whether we are dealing with a new User or an existing one

  const handleToggle = () => dispatch(toggleExistingUser());

  return { isExistingUser, handleToggle };
}





