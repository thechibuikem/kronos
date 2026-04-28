
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
// type for redux
import { getUrls } from "@/config";
const {backendUrl} = getUrls()
export interface Repo {
  repoName: string;
  repoUrl: string;
  githubOwnerId: string;
  repoId: string;
  isPrivate: boolean;
  owner:string
}


// async thunk to get all repos from backend
export const fetchAllRepos = createAsyncThunk("allRepos/fetchAllRepos",
async ()=>{
  const url = `${backendUrl}/api/v1/repos/repos`;
  const response = await axios.get(url, { withCredentials: true });
  return response.data.data.repos; //array of repos
}
)
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
export default allRepoSlice.reducer