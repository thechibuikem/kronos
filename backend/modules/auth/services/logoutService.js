import { redisClient } from "../../../core/redisClient.js";


// we use our refresh token stored in an http-only cookie as a key in redis, so here we're gonna clear the session token from redis
export async function logOutService(refreshToken) {

try{
  //clear particular refresh token from reddis
 await redisClient.del(refreshToken);
}
catch(error){
    console.log("error while updating redis at log out:",error)
}


}