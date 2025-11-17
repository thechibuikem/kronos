import { redisClient } from "../../../core/redisClient.js";

export async function logOutService(refreshToken) {

try{
  //clear particular refresh token from reddis
 await redisClient.del(refreshToken);
}
catch(error){
    console.log("error while updating redis at log out:",error)
}


}