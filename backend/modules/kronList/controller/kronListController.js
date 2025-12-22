 import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { kronValidator,addKron, getKrons } from "../service/kronListService.js";
 
//  getting controller to add a new kron to mdb
 export async function addKronsController(req, res) {
   const { kronData } = req.body;
   //checking if krondata is valid
   const inputResponse = await kronValidator(
     kronData.repoId,
     kronData.githubOwnerId,
     5
   );
if (inputResponse){

  console.log(inputResponse.error);
  res.json({error:inputResponse.error})
}
// add my kron to my kronList collection if it's okay
else{
  console.log("time to add new kron");
  await addKron(kronData)
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