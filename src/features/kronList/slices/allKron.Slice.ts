import { baseBackendUrl } from "@/App";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// type for redux
export interface Kron {
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
const initialState: Kron[] = [];
//All kron Slice 
const allKronSlice = createSlice({
    name:"allKrons",
    initialState,
  reducers: {
    updateKronUI(state, action: PayloadAction<Kron>) {
      state.push(action.payload);
    }},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllKrons.fulfilled, (state, action) => {
          return action.payload;
        });
    }
});
// export const {fetchAllRepos}= allRepoSlice.actions;
export default allKronSlice.reducer;
export const { updateKronUI } = allKronSlice.actions;