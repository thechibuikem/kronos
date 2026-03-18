import axios from "axios";
import { Card } from "@/features/home/ui/card"
import { IoIosAdd } from "react-icons/io";
import { useAllKronsHandler } from "@/features/kronList/handlers/allKrons.Handlers";
import {type Kron } from "@/features/kronList/slices/allKron.Slice";
import { Loader } from "@/features/loading/components/preloader";
import { getUrls } from "@/config.ts";
const { backendUrl } = getUrls();
import { useState } from "react";

interface WebHookData {
repo:string,
owner:string
}

// repocard 
function RepoCard({ repoName,repoUrl,githubOwnerId,repoId,owner
 }: Partial<Kron>) {
const [isLoading,setIsLoading] = useState<boolean>(false)
const {updateKronUiHandler} = useAllKronsHandler()


  // modelling the data that would be sent to our backend
const kronData:Partial<Kron> = {
  githubOwnerId:githubOwnerId,
  repoId:repoId,
}

const webhookData: WebHookData = {
  repoName: repoName,
  owner: owner,
};

  async function addKron() {
  try {
    setIsLoading(true);


console.log("our webhook data",webhookData)

console.log("owner of repo",owner)


    await axios.post(
      `${backendUrl}/api/kronList/addKron`,
      {kronData,webhookData},
      { withCredentials: true }
    );//adding kronList to user

    await updateKronUiHandler(kronData); //updafing ui with kron
  } catch (error) {
    console.log("error adding kron", error);
    setIsLoading(true);
  } finally {
    setIsLoading(false);
  }
  }


  // my repo card
  return (
    <Card className="w-full flex flex-row justify-between px-4 md:px-4 transparent-cards py-3 text-[1rem]">
      <a href={repoUrl}>{repoName}</a>
      {isLoading
        ?<Loader size={20}/>
        :<IoIosAdd size={"1.5rem"} className="hover:text-blue-950" onClick={addKron} />
      }
        </Card>
  );
}

export default RepoCard;