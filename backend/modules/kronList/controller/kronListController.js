import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";
import { addKron } from "../service/kronListService.js";
import { getKronsFromMDB } from "../service/kronListService.js";
import { deleteKron } from "../service/kronListService.js";

 //1. controller to get all users krons from mongoDb
export async function getAllkronsController(req,res){
  const refreshToken = req.cookies.refreshToken;//refresh token cookie
     if (!refreshToken) {
       throw new Error("refreshToken unavailable @ get krons controller");
     }
  const user = await getMDBUserThroughRefreshToken(refreshToken);//retrieving user using refresh token
  const allKrons =  await getKronsFromMDB(user)
  console.log(allKrons)
  res.json({ type: "krons", allKrons: allKrons }).status(200);
}


//2. controller to add a new kron to mdb
 export async function addKronsController(req, res) {
// 2.1 getting payload
console.log("payload @ addKron",req.body)

   const { kronData } = req.body;

   console.log("kronData itself",kronData)
   if (!kronData){
    throw new Error("kronData unavailable @ add krons controller")
   }
   // 2.2 consuming service
try{
   await addKron(kronData)
res.status(201).json({message:"created"})
}
// 2.3 error handling
   catch(error){
    console.error("error occured @ kron addition controller", error);
    res.status(500).json({error:error});
   }
}
 

//3.controller to remove kron from mdb
export async function deleteKronController(req,res) 
// 3.1 getting params
{
const {repoId} = req.params
   if (!repoId) {
     throw new Error("repoId unavailable @ delete krons controller");
   }
   // 3.2 consuming service 
   try {
     await deleteKron(repoId);
     res.status(204).end();
   } catch (error) {
     // 3.3 error handling
     console.err("error occured @ kron deletion controller", error);
     res.status(500).json({error:error});
   }
}

