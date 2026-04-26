    import { createSlice } from "@reduxjs/toolkit";
    // define the state interface
    interface AuthState {
    accessToken: String;
    isAuthorized:boolean
    }
    // create initial state
    const initialState: AuthState = {
      accessToken: "",
      isAuthorized:false,
    };
    // create the slice
    const authenticatedSlice = createSlice({
      name: "authenticated",
      initialState,
      // define reducers
      reducers: {
        setAccessToken: (state, action) => {
          state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
          state.accessToken = "";
        },
        setIsAuthorized: (state, action) => {
          state.isAuthorized = action.payload;
        },
      },
    });
    // export actions and reducer
    export const { setAccessToken, clearAccessToken,setIsAuthorized } =
    authenticatedSlice.actions;

    export default authenticatedSlice.reducer;
