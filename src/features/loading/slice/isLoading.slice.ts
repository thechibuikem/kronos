import { baseBackendUrl } from "@/App";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//initial state
const initialState: boolean = false
//All kron Slice
const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      return (action.payload);
    },
  }, //a reducer that pushes in a value to our already existing state

});
// export const {fetchAllRepos}= allRepoSlice.actions;
export default isLoadingSlice.reducer;
export const { setIsLoading } = isLoadingSlice.actions;
