import { configureStore } from "@reduxjs/toolkit";
import isExistingUserReducer from "../redux/auth/Slices/ExistingUserSlice"; //authReducer becomes the default export of LoggedInslice
import isAuthenticatedReducer from "../redux/auth/Slices/AuthenthicatedSlice"

export const store = configureStore({
  reducer: {
    /*{slice name:default export}*/
    existingUser: isExistingUserReducer,
    authenticated:isAuthenticatedReducer
  },
});

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
