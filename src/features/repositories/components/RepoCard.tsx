import { Card } from "@/features/home/ui/card"
import { IoIosAdd } from "react-icons/io";
import  {type Repo } from "@/features/repositories/slices/allRepo.Slice";
import axios from "axios";
import { useAllKronsHandler } from "@/features/kronList/handlers/allKrons.Handlers";
import { useAppDispatch } from "@/hooks/hooks";
import { updateKronUI } from "@/features/kronList/slices/allKron.Slice";

// repocard 
function RepoCard({ repoName,   repoUrl,githubOwnerId,repoId,isPrivate
 }: Repo) {

  // modelling the data that would be sent to our backend
const kronData = {
  repoName:repoName,
  repoUrl:repoUrl,
  githubOwnerId:githubOwnerId,
  repoId:repoId,
  isPrivate:isPrivate,
}

const dispatch = useAppDispatch();

// my handler to get krons
// const {getKrons} = useAllKronsHandler()

// my function to add a kron to mdb kronList
  // function addKrons() {
  //   axios
  //     .post(
  //       `http://localhost:5000/api/kronList/addKron`,
  //       { kronData },
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }


// dispatch(updateKronUI(kronData));
// console.log("Redux state:", store.getState().KronList);


  async function addKron() {
  try{ 
    await axios.post(
      `http://localhost:5000/api/kronList/addKron`,
      { kronData },
      { withCredentials: true }
    );

    dispatch(updateKronUI(kronData));

  }
  catch (error) {
console.log("error adding kron",error)
  }
  }


  // my add repo card
  return (
    <Card className="w-full flex flex-row justify-between px-4 md:px-4 transparent-cards py-3 text-[1rem]">
      <a href={repoUrl}>{repoName}</a>
      <IoIosAdd size={"1.5rem"} className="hover:text-blue-950" onClick={addKron} />
    </Card>
  );
}

export default RepoCard;