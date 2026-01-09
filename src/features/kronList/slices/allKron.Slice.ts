import { baseBackendUrl } from "@/App";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// type for redux
export interface Kron {
  _id:string,
  repoName: string;
  repoUrl: string;
  githubOwnerId: string;
  repoId: number;
  isPrivate: boolean;
}


// async thunk to get all repos from backend
export const fetchAllKrons = createAsyncThunk("allKrons/fetchAllKrons",
async ()=>{
  const url = `${baseBackendUrl}api/kronList/allKrons`;
  const response = await axios.get(url, { withCredentials: true });
// console.log(response)
  console.log("my krons from backend",response.data.allKrons); //array of repos
  return response.data.allKrons; //array of repos
})

//initial state
const initialState: Partial<Kron>[] = [];
//All kron Slice 
const allKronSlice = createSlice({
  name: "allKrons",
  initialState,
  reducers: {
    updateKronUI(state, action: PayloadAction<Partial<Kron>>) {
      state.push(action.payload);
    },
  }, //a reducer that pushes in a value to our already existing state

  extraReducers: (builder) => {
    builder.addCase(fetchAllKrons.fulfilled, (state, action) => {
      return action.payload;
    });//an extra reducer that updates our state to value returned by our fetchAllKrons async thunk
  },
});
// export const {fetchAllRepos}= allRepoSlice.actions;
export default allKronSlice.reducer;
export const { updateKronUI } = allKronSlice.actions;