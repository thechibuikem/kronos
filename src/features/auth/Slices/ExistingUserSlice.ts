import { createSlice } from "@reduxjs/toolkit";

interface newOrExitingUserState {
  isExistingUser: boolean;
}

const initialState: newOrExitingUserState = {
  isExistingUser: false,
};

const newOrEsxitingUserSlice = createSlice({
  name: "existingUser",
  initialState,
  reducers: {
    toggleExistingUser: (state) => {
      state.isExistingUser = !state.isExistingUser;
    },
  },
});
// 
export const {toggleExistingUser } = newOrEsxitingUserSlice.actions;
export default newOrEsxitingUserSlice.reducer;
