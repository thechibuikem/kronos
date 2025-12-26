import axios from "axios";
import { Card } from "@/features/home/ui/card"
import { IoIosAdd } from "react-icons/io";
import { useAllKronsHandler } from "@/features/kronList/handlers/allKrons.Handlers";


// type for data we'd send to backend for kron storage
export interface Kron {
  repoName: string;
  repoUrl: string;
  githubOwnerId: string;
  repoId: number;
  isPrivate: boolean;
}

// repocard 
function RepoCard({ repoName,repoUrl,githubOwnerId,repoId,
 }: Partial<Kron>) {

const {updateKronUiHandler} = useAllKronsHandler()


  // modelling the data that would be sent to our backend
const kronData:Partial<Kron> = {
  githubOwnerId:githubOwnerId,
  repoId:repoId,
}


// dispatch(updateKronUI(kronData));
// console.log("Redux state:", store.getState().KronList);

  async function addKron() {
  try{ 
    await axios.post(
      `http://localhost:5000/api/kronList/addKron`,
      { kronData },
      { withCredentials: true }
    );

    await updateKronUiHandler(kronData)//updafing ui with kron

  }
  catch (error) {
console.log("error adding kron",error)
  }
  }


  // my repo card
  return (
    <Card className="w-full flex flex-row justify-between px-4 md:px-4 transparent-cards py-3 text-[1rem]">
      <a href={repoUrl}>{repoName}</a>
      <IoIosAdd size={"1.5rem"} className="hover:text-blue-950" onClick={addKron} />
    </Card>
  );
}

export default RepoCard;