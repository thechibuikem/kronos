import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { kronValidator,addKron, getKronsFromMDB, getRepoFromRepoId, deleteKron } from "../service/kronListService.js";
import { RepoModel } from "../../repoList/models/repoModel.js";//our model for repositories
import { addWebHook } from "../../changeDetection/service/changeDetection.service.js";

 //1. controller to get all users krons from mongoDb
export async function getAllkronsController(req,res){
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;//refresh token cookie
  const user = await getMDBUserThroughRefreshToken(refreshToken);//retrieving user using refresh token
  const allKrons =  await getKronsFromMDB(user)
  console.log(allKrons)
  res.json({ type: "krons", allKrons: allKrons }).status(200);
}


//2. controller to add a new kron to mdb
 export async function addKronsController(req, res) {

// console.log(req.body)

// 2.1 initializing variables
   const { kronData,webhookData } = req.body;
   const refreshToken = req.refreshToken


   // 2.2 registering webhook on github
await addWebHook(webhookData,refreshToken)


  //2.3 get the repo we're registering as kron
  const requiredRepo = await RepoModel.findOne({ repoId: kronData.repoId });

  //2.4 retrieve this repos credentials
  const newKronData = {
    githubOwnerId:kronData.githubOwnerId,
    repoId:requiredRepo.repoId
  }

   //2.5 validate 2.4 (flagged if invalid)
   const inputResponse = await kronValidator(
     newKronData.githubOwnerId,
     newKronData.repoId,
     5
   );

  //  2.6 revoke on flag
if (inputResponse){
  console.log(inputResponse.error);
  res.json({error:inputResponse.error})
}
// 2.7 register kron is unflagged
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
 


//3.controller for deleting krons on mongoDB
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