    import { createSlice } from "@reduxjs/toolkit";
    // define the state interface
    interface isAuthenticatedState {
    isAuthenticated: String;
    }
    // create initial state
    const initialState: isAuthenticatedState = {
    isAuthenticated: "",
    };
    // create the slice
    const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState,
    // define reducers
    reducers: {
        setAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload;
        },
        resetAuthenticated: (state) => {
        state.isAuthenticated = "";
        },
    },
    });
    // export actions and reducer
    export const { setAuthenticated, resetAuthenticated } =
    authenticatedSlice.actions;

    export default authenticatedSlice.reducer;
