import { configureStore } from "@reduxjs/toolkit";
import isExistingUserReducer from "../features/auth/Slices/ExistingUserSlice"; //authReducer becomes the default export of LoggedInslice
import isAuthenticatedReducer from "../features/auth/Slices/AuthenthicatedSlice"

export const store = configureStore({
  reducer: {
    /*{slice name:default export}*/
    existingUser: isExistingUserReducer,
    authenticated:isAuthenticatedReducer
  },
});

// const stateName = useSelector((state:RootState)=>state.sliceName)

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
