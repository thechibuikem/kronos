    import { createSlice } from "@reduxjs/toolkit";
    // define the state interface
    interface AuthState {
    accessToken: String;
    }
    // create initial state
    const initialState: AuthState = {
      accessToken: "",
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
    },
    });
    // export actions and reducer
    export const { setAccessToken, clearAccessToken } =
    authenticatedSlice.actions;

    export default authenticatedSlice.reducer;
