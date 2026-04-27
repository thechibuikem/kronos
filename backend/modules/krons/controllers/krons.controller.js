import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { addKron } from "../service/krons.service.js";
import { getKronsFromMDB } from "../service/krons.service.js";
import { deleteKron } from "../service/krons.service.js";

 //1. controller to get all users krons from mongoDb
export async function getAllkronsController(req,res){

  const user = await getMDBUserThroughRefreshToken(refreshToken);//retrieving user using refresh token
  const allKrons =  await getKronsFromMDB(user)

const responseBody = {};
// preparing my response body
if (allKrons) {
  responseBody.krons = allKrons;
}

  res.status(200).json({ data:responseBody });
}


//2. controller to add a new kron to mdb
 export async function addKronsController(req, res) {
  //  2.1 input validation
   const { kronData } = req.body;

   if (!kronData) {
    console.error("kron-data, does not exist");
          return res.status(400).json({
        error: { message: "kronData required", code: "INVALID_PAYLOAD" }
      })
   }

   const { githubOwnerId, repoId } = kronData;

   if (typeof githubOwnerId !== "string" || !githubOwnerId.trim()) {
    console.error("githubOwnerId must be non-empty string");
     return res.status(400).json({
       error: {
         message: "githubOwnerId must be non-empty string",
         code: "INVALID_GITHUB_OWNER_ID",
       },
     });
   }

   if (typeof repoId !== "string" || !repoId.trim()) {
    console.error("repoId must be non-empty string");
     return res.status(400).json({
       error: {
         message: "repoId must be non-empty string",
         code: "INVALID_REPO_ID",
       },
     });
   }

   // 2.2 consuming service
   try {
     await addKron(kronData);
     return res.status(201).json({
       data: {
         message: "Kron created successfully",
       },
     });

   } catch (error) {
     console.error("Kron Creation Error: ",error)
     return res.status(500).json({
       error: {
         message: "Failed to create kron",
         code: "ADD_KRON_FAILED",
       },
     });;
   }
 }
 

//3.controller to remove kron from mdb
export async function deleteKronController(req,res) 
// 3.1 getting params
{
const {repoId} = req.params
   if (!repoId||typeof repoId !== "string") {
    console.error("repo, does not exist");

     return res
       .status(401)
       .json({
         error: {
           message: "repoId is invalid",
           code: "INVALID_REPOID",
         },
       });
   }
   // 3.2 consuming service 
   try {
     await deleteKron(repoId);
     res.status(204).json({
       data: {
         message: "Kron deleted successfully",
       },
     });
    } catch (error) {
     console.error("kron deletion controller", error);
     res.status(500).json({
       error: {
         message: "Failed to delete kron",
         code: "DELETE_KRON_FAILED",
       }
     });
   }
}

