import { useAppDispatch,useAppSelector } from "@/hooks/hooks";
import { type RootState } from "@/store/store";
import { type Repo } from "../slices/allRepo.Slice";
import { fetchAllRepos } from "../slices/allRepo.Slice";

//handler that would update redux state
export function useAllReposHandler(){
    //initializing dispatch
    const dispatch = useAppDispatch();
    // getting state from redux
    const repos:Repo[] = useAppSelector((state:RootState)=>state.repoList)
// function to get repos
const getRepos = ()=>{
    dispatch(fetchAllRepos())
}
return{repos,getRepos}
}