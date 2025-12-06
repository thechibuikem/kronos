import { configureStore } from "@reduxjs/toolkit";
import isExistingUserReducer from "../features/auth/slices/ExistingUserSlice"; //authReducer becomes the default export of LoggedInslice
import isAuthenticatedReducer from "../features/auth/slices/AuthenthicatedSlice"

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
