import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { kronValidator,addKron, getKronsFromMDB, getRepoFromRepoId, deleteKron } from "../service/kronListService.js";
import { RepoModel } from "../../repoList/models/repoModel.js";

 //getting all krons from mdb
export async function getAllkronsController(req,res){
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;//refresh token cookie
  const user = await getMDBUserThroughRefreshToken(refreshToken);//retrieving user using refresh token
  const allKrons =  await getKronsFromMDB(user)
  console.log(allKrons)
  res.json({ type: "krons", allKrons: allKrons }).status(200);
}


//  getting controller to add a new kron to mdb
 export async function addKronsController(req, res) {
   const { kronData } = req.body;

  //  first get the repo document we're dealing with
  const requiredRepo = await RepoModel.findOne({ repoId: kronData.repoId });

  const newKronData = {
    githubOwnerId:kronData.githubOwnerId,
    repoId:requiredRepo.repoId
  }

   //checking if krondata is valid
   const inputResponse = await kronValidator(
     newKronData.githubOwnerId,
     newKronData.repoId,
     5
   );
if (inputResponse){
  console.log(inputResponse.error);
  res.json({error:inputResponse.error})
}
// add my kron to my kronList collection if it's okay
else{
  try{
  await addKron(newKronData);
  res.json({ error: "kron added successfully" });
  }
  catch(err){
  res.json({ error: "error adding kron, try again" });
  }
  console.log('done adding new kron')
}}
 


//deleting krons on mongoDB
export async function deleteKronController(req,res) 
{
const {repoId} = req.params
const requiredRepo = await getRepoFromRepoId(repoId)
try{  await deleteKron(requiredRepo);
  res.json({success:"kron deleted successfully"})
}
catch(err){
  res.json({error:"error deleting kron, try again"})
}}