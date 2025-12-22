import { useAppDispatch,useAppSelector } from "@/hooks/hooks";
import { type RootState } from "@/store/store";
import type{ Kron } from "../slices/allKron.Slice";
import { fetchAllKrons } from "../slices/allKron.Slice";

//handler that would update redux state
export function useAllKronsHandler(){
    //initializing dispatch
    const dispatch = useAppDispatch();
    // getting state from redux
    const krons:Kron[] = useAppSelector((state:RootState)=>state.KronList
)
// function to get repos
const getKrons = async ()=>{
    dispatch(fetchAllKrons())
}
return{krons,getKrons}
}