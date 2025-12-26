import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { kronValidator,addKron, getKrons } from "../service/kronListService.js";
import { RepoModel } from "../../repoList/models/repoModel.js";

//  getting controller to add a new kron to mdb
 export async function addKronsController(req, res) {
   const { kronData } = req.body;

  //  first get the repo document we're dealing with
  const requiredRepo = await RepoModel.findOne({ repoId: kronData.repoId });

  const newKronData = {
    githubOwnerId:kronData.githubOwnerId,
    repoId:requiredRepo._id
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
  console.log("time to add new kron");
  await addKron(newKronData)
  console.log('done adding new kron')
}
 }

 //getting all krons from mdb
export async function getAllkronsController(req,res){
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;//refresh token cookie
  const user = await getMDBUserThroughRefreshToken(refreshToken);//retrieving user using refresh token
  const allKrons =  await getKrons(user)

  console.log(allKrons)
  res.json({ type: "krons", allKrons: allKrons }).status(200);
}