import { configureStore } from "@reduxjs/toolkit";
import isExistingUserReducer from "../features/auth/slices/ExistingUser.Slice"; 
import isAuthenticatedReducer from "../features/auth/slices/Authenthicated.Slice"
import allRepoListReducer from "../features/watchlist/slices/allRepo.Slice"

//redux store holding all shared states
export const store = configureStore({
  reducer: {
    existingUser: isExistingUserReducer,
    authenticated: isAuthenticatedReducer,
    repoList: allRepoListReducer,
  },
});

//exporting type of state in centre store and dispatches for our useDispatch and 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
