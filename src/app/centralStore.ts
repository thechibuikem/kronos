import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/Slices/LoggedInSlice"; //authReducer becomes the default export of LoggedInslice 

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
