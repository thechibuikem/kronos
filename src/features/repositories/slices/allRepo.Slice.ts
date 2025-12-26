import { baseBackendUrl } from "@/App";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
// type for redux
export interface Repo {
  repoName: string;
  repoUrl: string;
  githubOwnerId: string;
  repoId: number;
  isPrivate: boolean;
}


// async thunk to get all repos from backend
export const fetchAllRepos = createAsyncThunk("allRepos/fetchAllRepos",
async ()=>{
  const url = `${baseBackendUrl}api/watchList/allRepos`;
  const response = await axios.get(url, { withCredentials: true });
console.log(response.data.allRepos)
  // console.log(response.data.allRepos); //array of repos
  return response.data.allRepos; //array of repos
})

//initial state
const initialState: Repo [] = []
//All Repo Slice 
const allRepoSlice = createSlice({
    name:"allRepos",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(
            fetchAllRepos.fulfilled,(state,action)=>{
                return action.payload;
            }
        )
    }
});
// export const {fetchAllRepos}= allRepoSlice.actions;
export default allRepoSlice.reducer