import { createSlice } from "@reduxjs/toolkit";

// type for redux
interface InitialState {
  isExistingUser: boolean;
}

//initial state
const initialState: InitialState = {
  isExistingUser: false,
};

// is existingUser slice
const isExistingUserSlice = createSlice({
  name: "existingUser",
  initialState,
  reducers: {
    toggleExistingUser: (state) => {
      state.isExistingUser = !state.isExistingUser;
    },
  },
});
// 
export const { toggleExistingUser } = isExistingUserSlice.actions;//works with reducer
export default isExistingUserSlice.reducer;//works with store reducer:{  existingUser: isExistingUserReducer}
