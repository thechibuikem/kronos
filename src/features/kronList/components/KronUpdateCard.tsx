import axios from "axios";
import { Card } from "@/features/home/ui/card"
import { AiOutlineDelete } from "react-icons/ai";
import type { Kron } from "../slices/allKron.Slice";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";
import { Loader } from "@/features/loading/components/preloader";
import { useState } from "react";


// my kron update card for my kron LIst page
function KronUpdateCard({repoName,_id}:Partial<Kron>) {
const [isLoading,setIsLoading] = useState<boolean>(false)
const {getKrons} = useAllKronsHandler();

// my http request to remove a kron
  async function removeKron() {
    try{
      setIsLoading(true)
      await axios.delete(
            `http://localhost:5000/api/kronList/deleteKron/${_id}`,
      { withCredentials: true }
    )
    }catch(err){
      throw new Error
    }
    finally{
      getKrons();
      setIsLoading(false)
    }
  }
  
// the component being rendered itself
  return (
<Card className="w-full flex flex-row justify-between px-4 md:px-8 transparent-cards py-3 text-[1rem]">
<h2>{repoName}</h2>
  {isLoading
?<Loader size={20}/>
:<AiOutlineDelete size={"1.25rem"} className="hover:text-blue-950" onClick={removeKron}/>
}
    </Card>
  );
}

export default KronUpdateCard