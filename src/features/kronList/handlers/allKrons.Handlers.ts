import { useAppDispatch,useAppSelector } from "@/hooks/hooks";
import { type RootState } from "@/store/store";
import type{ Kron } from "../slices/allKron.Slice";
import { fetchAllKrons,updateKronUI } from "../slices/allKron.Slice";


//handler that would update redux state
export function useAllKronsHandler(){
  //initializing dispatch
  const dispatch = useAppDispatch();
  // getting state from redux
  const krons: Partial<Kron>[] = useAppSelector((state: RootState) => state.KronList);

  //using updateKronUi action in handler function to add kron
  const updateKronUiHandler = async (kronData: Partial<Kron>) => {
    dispatch(updateKronUI(kronData));
  };

  // using async thunk in handler function to fetch repos
  const getKrons = async () => {
    dispatch(fetchAllKrons());
  };

  return { krons, getKrons,updateKronUiHandler };
}